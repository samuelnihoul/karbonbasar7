// creates the buy tx
import { Client, TransferTransaction, PrivateKey, Hbar } from '@hashgraph/sdk';
const client = Client.forMainnet().setOperator(process.env.REACT_APP_NL3, process.env.REACT_APP_NL3P);

export default async function creeateTX(accountID, amount) {
    //converts the USD amount to Hbar using the current price fetched from the reverse proxy
    async function convertUSDToHbar(amount) {
        let price = await fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify');
        let pri = await price.json();
        pri = pri['data']['HBAR'][0]['quote']['USD']['price']
        return amount / pri;
    }
    amount = await convertUSDToHbar(amount);
    amount = amount * 100000000;
    const transferTransaction = await new TransferTransaction().addHbarTransfer(process.env.REACT_APP_NL3, Hbar.fromTinybars(amount))
        .addHbarTransfer(accountID, Hbar.fromTinybars(-amount)).freezeWith(client).sign(PrivateKey.fromString(process.env.REACT_APP_NL3P));
    let t = transferTransaction.toBytes()

    return t






}
