import CryptoJS from "crypto-js";

export const decrypt = (encryptedData: string): any => {
  const passphrase = import.meta.env.VITE_SECRET_PASSPHRASE;
  console.log(encryptedData, 'encryptedData')
  console.log(passphrase, 'passphrase')
    const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : "";
  };
