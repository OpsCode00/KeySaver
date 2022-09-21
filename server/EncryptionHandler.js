const crypto = require('crypto');
const secret = 'pprvbraumutjsrssaizxyvvlgllojzlw' //32

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16)); //Ho un Buffer con 16 Byte Randomici
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]); //Ottengo la Password Criptata (ma ancora Bufferizzata)

    return { iv: iv.toString("hex"), password: encryptedPassword.toString("hex") }; //Passo l'Hash value e l'IV per il Decripting
};

const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secret), Buffer.from(encryption.iv, "hex")); //Prendo l'IV dall'Oggetto passato prima

    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, "hex")),decipher.final()]); //Prendo la Password dall'Oggetto

    return decryptedPassword.toString();
}

module.exports = {encrypt, decrypt};