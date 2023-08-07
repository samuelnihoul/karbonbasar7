
import React from 'react'
import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { useEffect, useState } from "react";
import createTX from './hederaRaw'
import { useTranslation } from 'react-i18next'
const hashconnect = new HashConnect(true);
export default function HashButton() {
  const { t } = useTranslation(['navbar'])
  const defaultMetadata = { name: "", description: "", icon: "" }
  const [status, setStatus] = useState("disconnected");

  const [saveData, ssd] = useState({
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: defaultMetadata,
    pairedAccounts: [],
  });
  const [pk, spk] = useState('guest');

  const appMetadata = {
    name: "karbonbasar",
    description: "The NFT Carbon Offset Marketplace",
    icon: "https://www.hashpack.app/img/logo.svg",
  };

  async function initHashconnect() {
    //create the hashconnect instance
    setUpEvents();
    if (!saveData.topic) {
      //first init, store the private key in localstorage
      let initData = await hashconnect.init(appMetadata);
      ssd(data => { data.privateKey = initData.privKey; return data });

      //then connect, storing the new topic in localstorage
      const state = await hashconnect.connect();
      ssd(data => { data.topic = state.topic; return data })

      //generate a pairing string, which you can display and generate a QR code from
      ssd(data => {
        data.pairingString = hashconnect.generatePairingString(
          state,
          "mainnet",
          true
        ); return data
      })
      //find any supported local wallets
      hashconnect.findLocalWallets();
      setStatus("ready for pairing");
    } else {
      await hashconnect.init(appMetadata, saveData.privateKey);
      await hashconnect.connect(saveData.topic, saveData.pairedWalletData);
      setStatus("paired");
    }
    saveDataInLocalstorage();
  }
  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      setStatus("paired");
      localStorage.setItem('pairedWallet', data.accountIds[0]);
      localStorage.setItem('topic', data.topic);
      ssd(d => { d.pairedWalletData = data.metadata; return d });

      data.accountIds.forEach((id) => {
        ssd(d => { d.pairedAccounts.push(id); return d });

      });

      saveDataInLocalstorage();


    });
  }
  async function connectToExtension() {
    hashconnect.connectToLocalWallet(saveData.pairingString);
  }
  function saveDataInLocalstorage() {
    let data = JSON.stringify(saveData);
    localStorage.setItem("hashconnectData", data);
  }
  useEffect(
    () => {
      let ignore = false
      async function init() {
        let foundData = localStorage.getItem("hashconnectData");

        if (foundData) {
          ssd(JSON.parse(foundData));


        }
        await initHashconnect();
        if (!ignore) {
          saveDataInLocalstorage();
          spk(saveData.pairedAccounts[0] || 'guest')
        }

      }
      init();
      return () => {
        ignore = true
      }
    }, [])

  return (
    <button
      className='hashconnect'
      onClick={async () => {
        await connectToExtension();
        saveDataInLocalstorage();
        setTimeout(() => spk(saveData.pairedAccounts[0] || 'pending'), 1)
        setTimeout(() => spk(saveData.pairedAccounts[0] || 'pending'), 10000)
        setTimeout(() => spk(saveData.pairedAccounts[0] || 'pending'), 20000)
        setTimeout(() => spk(saveData.pairedAccounts[0] || 'timed out'), 30000)
      }}
    >
      {pk != 'guest' ? '✅ ' + pk : t('connectwithhashpack')}
    </button>
  );
}
export async function pay(price: number) {
  const { t } = useTranslation(['navbar'])
  alert(t('pleasesendan'))
  let tx = await createTX(localStorage.getItem('pairedWallet'), price);
  //send the transaction
  const transaction: MessageTypes.Transaction = {
    topic: localStorage.getItem('topic'),
    byteArray: tx,
    metadata: {
      accountToSign: localStorage.getItem('pairedWallet'),
      returnTransaction: false
    }
  }
  let response = await hashconnect.sendTransaction(localStorage.getItem('topic'), transaction)
  alert(JSON.stringify(response));
  fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify', {})
  alert(t('dontforget'))
}
