import { cry } from 'thor-devkit'

export default class VechainWalletHelper {

    static createPrivateKey(): Buffer {
        return cry.secp256k1.generatePrivateKey()
    }

    static getPublicKey(privateKey: Buffer): Buffer {
        return cry.secp256k1.derivePublicKey(privateKey)
    }

    static getAddress(privateKey: Buffer) {
        const publicKey = VechainWalletHelper.getPublicKey(privateKey)
        const buffer = cry.publicKeyToAddress(publicKey)
        return buffer.toString('hex')
    }

}