import localForage from 'localforage'
import nemWrapper from './nemWrapper'
import nem from 'nem-sdk'

export default class settingModel {
    balance: number = 0
    address: string = ''
    publicKey: string = ''
    privateKey: string = ''
    phoneNumber: string = ''

    nem = new nemWrapper()

    constructor() {
    }

    // ローカルストレージへ保存.
    async save() {
        let key = '3-step-wallet'
        let result:any = await localForage.setItem(key, this.toJSON())
        return result
    }

    // ローカルストレージから取得.
    async load() {
        let key = '3-steps-wallet'
        let result:any = await localForage.getItem(key)
        if (result !== null) {
            this.privateKey = result.privateKey
            this.phoneNumber = result.phoneNumber
        }
        return result
    }

    // ローカルストレージから削除.
    async remove() {
        let key = '3-steps-wallet'
        let result:any = await localForage.removeItem(key)
        return result
    }
    // アカウント情報を取得.
    
    async getAccount() {
        let result = await this.nem.getAccount(this.address)
        this.balance = result.account.balance / this.nem.getNemDivisibility()
        if ( result.account.publicKey !== null ) { this.publicKey = result.account.publicKey }
    }

    // 送金(NEM)
    async sendNem(address:string, amount:number, message:string)  {
        let result = await this.nem.sendNem(address, this.privateKey, amount, message)
        return result
    }

    // 秘密鍵からウォレット作成.
    async createWalletWithPrivateKey(privateKey:string) {
        
    }

    toJSON() {
        return {
            address: this.address,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            phoneNumber: this.phoneNumber
        }
    }
}