import * as crypto from 'crypto-js';

export class Utilities {
  public static setSessionStorage(storageKey: string, value: string): void {
    let encryptedValue: string = crypto.AES.encrypt(value, this.key);

    sessionStorage.setItem(storageKey, encryptedValue);
    // console.log('sessionstorage: ', sessionStorage);
  }

  public static getSessionStorage(storageKey: string): string {
    let encryptedValue: string = sessionStorage.getItem(storageKey);
    if (!encryptedValue) {
      return null;
    }

    let bytes  = crypto.AES.decrypt(encryptedValue, this.key);
    // console.log('decrypted: ', bytes.toString(crypto.enc.Utf8));
    return bytes.toString(crypto.enc.Utf8);
  }

  public static removeItemFromSessionStorage(storageKey: string): void {
    sessionStorage.removeItem(storageKey);
  }
  private static key: string = 'alwi243mnb2xxre228892kklskd';
}
