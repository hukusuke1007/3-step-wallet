import localForage from 'localforage'
import nem from 'nem-sdk'
import encoding from 'encoding-japanese'
import {/* UnconfirmedTransactionListener, ConfirmedTransactionListener, */
    Account, AccountHttp, MosaicHttp, NEMLibrary, NetworkTypes, Address, ServerConfig,
    SimpleWallet, Password, EncryptedPrivateKey, TimeWindow, Message, PlainMessage, XEM,
    TransactionHttp, TransferTransaction, AccountOwnedMosaicsService, MosaicId, Transaction,
    PublicAccount, MultisigAggregateModificationTransaction, CosignatoryModification, CosignatoryModificationAction,
    MultisigTransaction, TransactionTypes, MultisigSignatureTransaction, SignedTransaction} from 'nem-library'
import { resolve } from 'dns';

    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET)
    const nodes: Array<ServerConfig> = [
      {protocol: 'https', domain: 'aqualife2.supernode.me', port: 7891},
      {protocol: 'https', domain: 'aqualife3.supernode.me', port: 7891},
      {protocol: 'https', domain: 'happy.supernode.me', port: 7891},
      {protocol: 'https', domain: 'mnbhsgwbeta.supernode.me', port: 7891},
      {protocol: 'https', domain: 'nsm.supernode.me', port: 7891},
      {protocol: 'https', domain: 'kohkei.supernode.me', port: 7891},
      {protocol: 'https', domain: 'mttsukuba.supernode.me', port: 7891},
      {protocol: 'https', domain: 'strategic-trader-1.supernode.me', port: 7891},
      {protocol: 'https', domain: 'strategic-trader-2.supernode.me', port: 7891},
      {protocol: 'https', domain: 'shibuya.supernode.me', port: 7891},
      {protocol: 'https', domain: 'qora01.supernode.me', port: 7891},
      {protocol: 'https', domain: 'pegatennnag.supernode.me', port: 7891}
    ]

    const accountHttp: AccountHttp = new AccountHttp(nodes)
    const transactionHttp: TransactionHttp = new TransactionHttp(nodes)
    const mosaicHttp = new MosaicHttp(nodes)

export default class settingModel {
    endpoint: string = ''
    host: string = ''
    port: string = ''
    net: string = ''
    balance: number = 0
    address: string = ''
    publicKey: string = ''
    privateKey: string = ''
    phoneNumber: string = ''
    message: string = ''

    constructor () {
        // NIS設定.
        this.host = 'https://aqualife2.supernode.me'
        this.port = '7891'
        this.net = nem.model.network.data.mainnet.id
        this.endpoint = nem.model.objects.create("endpoint")(this.host, this.port)    
    }

    // NISの状態確認.
    async isNIS() {
        let result = await nem.com.requests.endpoint.heartbeat(this.endpoint)
        if (result.message === 'ok') {
            return true
        } else {
            return false
        }
    }
    // 秘密鍵からウォレット作成.
    createWalletWithPrivateKey(privateKey: string) {
        // Set a wallet name
        let walletName = "QuantumMechanicsImported"

        // Set a password
        let password = "Something"

        // Create a private key wallet
        let wallet = nem.model.wallet.importPrivateKey(
            walletName,
            password,
            privateKey,
            nem.model.network.data.mainnet.id);
        console.log(wallet)
        return wallet
    }
     
    // 送金（NEM）
    async sendNem(address:string, privateKey:string, amount:number, message:string) {
        let common = nem.model.objects.create('common')('', privateKey)
        let transferTransaction = nem.model.objects.create('transferTransaction')(address, amount, message)
        let transactionEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, this.net)
        let result = await nem.model.transactions.send(common, transactionEntity, this.endpoint)
        return result
    }
    // 送金（Mosaic）
    async sendMosaics(address:string, privateKey:string, mosaics:Array<any>, message:string) {
        let common = nem.model.objects.create('common')('', privateKey)
        let transferTransaction = nem.model.objects.create('transferTransaction')(address, 1, message)
        let mosaicDefinitionMetaDataPair:any = await this.getMosaicDefinitionMetaDataPair(this.endpoint, mosaics)
        mosaics.forEach((mosaic) => {
            let fullMosaicName = mosaic.namespace + ':' + mosaic.name
            if ((mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.id.namespaceId === mosaic.namespace) &&
                (mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.id.name === mosaic.name)) {
                let divisibility = 0
                mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition.properties.forEach((prop:any) => {
                    if (prop.name === 'divisibility') { divisibility = prop.value }
                })
                let quantity = mosaic.amount * Math.pow(10, divisibility)
                let mosaicAttachment = nem.model.objects.create('mosaicAttachment')(mosaic.namespace, mosaic.name, quantity)
                transferTransaction.mosaics.push(mosaicAttachment)
            }
        })
        let transactionEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitionMetaDataPair, this.net)
        let result = await nem.model.transactions.send(common, transactionEntity, this.endpoint)
        return result
    }

    // モザイク定義取得.
    async getMosaicDefinitionMetaDataPair(endpoint:string, mosaics:Array<any>)
    {
        return new Promise(function(resolve, reject) {
            let mosaicDefinitionMetaDataPair = nem.model.objects.get('mosaicDefinitionMetaDataPair')
            let mosaicCount = 0
            mosaics.forEach((mosaic) => {
                let mosaicAttachment = nem.model.objects.create('mosaicAttachment')(mosaic.namespace, mosaic.name, mosaic.amount)
                let result = nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId)
                .then((result: any) => {
                    mosaicCount = mosaicCount + 1
                    let neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(result.data, [mosaic.name])
                    let fullMosaicName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId)
                    if (undefined === neededDefinition[fullMosaicName]) {
                        console.error('Mosaic not found !')
                        return
                    }
                    mosaicDefinitionMetaDataPair[fullMosaicName] = {}
                    mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName]
                    let supply = 0
                    result.data.some((obj: any) => {
                    if ((obj.mosaic.id.namespaceId === mosaic.namespace) &&
                        (obj.mosaic.id.name === mosaic.name)) {
                            obj.mosaic.properties.some((prop: any) => {
                            if (prop.name === 'initialSupply') {
                                supply = prop.value
                                return true
                            }
                        })
                    }
                    })
                    mosaicDefinitionMetaDataPair[fullMosaicName].supply = supply
                    if (mosaicCount >= mosaics.length) { resolve(mosaicDefinitionMetaDataPair) }
                }).catch((e: any) => {
                    console.error(e)
                    reject(e)
                })
            })
        })
    }

     // ローカルストレージへ保存.
    async save() {
        let key = '3-step-wallet'
        let result:any = await localForage.setItem(key, this.toJSON())
        return result
    }

    // ローカルストレージから取得.
    async load() {
        let key = '3-step-wallet'
        let result:any = await localForage.getItem(key)
        if (result !== null) {
            this.privateKey = result.privateKey
            this.phoneNumber = result.phoneNumber
            this.publicKey = result.publicKey
        }
        return result
    }

    // ローカルストレージから削除.
    async remove() {
        let key = '3-step-wallet'
        let result:any = await localForage.removeItem(key)
        return result
    }
    // アカウント情報取得.
    async getAccount(address: string) {
        let result = await nem.com.requests.account.data(this.endpoint, address)
        return result
    }

    // メッセージ取得
   /*async getMessege(message: string) {
        let result = await nem.com.requests.message.data(this.endpoint, message)
        return result
    }*/

    // QRコードjson取得.
    async getQRcodeJson(v:string, type:number, name:string, addr:string, amount:number, msg:string) {
        // v:2, type:1 アカウント, type:2 請求書
        let amountVal = amount * Math.pow(10, 6)
        let json = {
          type: type,
          data: {
            name: name,
            addr: addr,
            amount: amountVal,
            msg: msg
          },
          v: v
        }
        let jsonString = JSON.stringify(json)
        let result = encoding.codeToString(encoding.convert(this.getStr2Array(jsonString), 'UTF8'))
        return result
    }

    // NEMの可分性取得
    getNemDivisibility(): number {
        return Math.pow(10, 6)
    }

    private getStr2Array(str:string) {
        let array = []
        for (let i = 0; i < str.length; i++) {
          array.push(str.charCodeAt(i))
        }
        return array
    }

    toJSON() {
        return {
            address: this.address,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            message: this.message,
            phoneNumber: this.phoneNumber
        }
    }

    // XEMのマルチシグトランザクション作成
    createMultisigTransaction(multisigPublicKey: string, addr: string, amount: number, message: string) {
        const transferTransaction: Transaction = TransferTransaction.create(
            TimeWindow.createWithDeadline(),
            new Address(addr),
            new XEM(amount),
            PlainMessage.create(message)
        )
        const multisigTransaction: MultisigTransaction = MultisigTransaction.create(
            TimeWindow.createWithDeadline(),
            transferTransaction,
            PublicAccount.createWithPublicKey(multisigPublicKey)
        )
        return multisigTransaction
    }

    // マルチシグアカウントからNEMを送金.
    createXemTransaction(consigPrivateKey: string, addr: string, amount: number, message: string, multisigPublicKey:string) {
        return new Promise((resolve, reject) => {
            let account = Account.createWithPrivateKey(consigPrivateKey)
            let signedTransaction: SignedTransaction
            if (multisigPublicKey) {
                const multisigTransaction = this.createMultisigTransaction(multisigPublicKey, addr, amount, message)
                signedTransaction = account.signTransaction(multisigTransaction)
            } else {
                const transferTransaction: Transaction = TransferTransaction.create(
                    TimeWindow.createWithDeadline(),
                    new Address(addr),
                    new XEM(amount),
                    PlainMessage.create(message)
                )
                signedTransaction = account.signTransaction(transferTransaction)
            }

            transactionHttp.announceTransaction(signedTransaction).subscribe(
                result => {
                    console.log(result)
                    return resolve(result)
                },
                error => {
                    console.error(error)
                    return reject(error)
                }
            )
        })
    }

    
}
