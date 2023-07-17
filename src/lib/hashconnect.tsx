import React from 'react'
import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { useEffect, useState } from "react";
import createTX from './hederaRaw'
import './hashconnect.css'
import { useTranslation } from 'react-i18next'
interface IData {
  topic: string;
  pairingString: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata;
  pairedAccounts: string[];
}
const hashconnect: HashConnect = new HashConnect(true);
export default function HashButton() {
  const { t } = useTranslation(['navbar'])
  const defaultMetadata: HashConnectTypes.WalletMetadata = { name: "", description: "", icon: "" }
  const [status, setStatus] = useState("disconnected");
  const [savedData, setSavedData] = useState<IData>({
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: defaultMetadata,
    pairedAccounts: [],
  });
  const [pk, spk] = useState('guest');

  const appMetadata: HashConnectTypes.AppMetadata = {
    name: "karbonbasar",
    description: "The NFT Carbon Offset Marketplace",
    url: "https://karbonbasar.harmonia-eko.ooo",
    icon: "https://karbonbasar.harmonia-eko.ooo/pure2.png"
  };

  async function initHashconnect() {
    //create the hashconnect instance
    setUpEvents();
    if (!savedData.topic) {
      //first init, store the private key in localstorage

      let initData = await hashconnect.init(appMetadata);
      setSavedData(data => { data.privateKey = initData.privKey; return data });

      //then connect, storing the new topic in localstorage
      const state = await hashconnect.connect();
      setSavedData(data => { data.topic = state.topic; return data })

      //generate a pairing string, which you can display and generate a QR code from
      setSavedData(data => {
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
      await hashconnect.init(appMetadata, savedData.privateKey);
      await hashconnect.connect(savedData.topic, savedData.pairedWalletData);
      setStatus("paired");
    }
    savedDataInLocalstorage();
  }
  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      setStatus("paired");
      localStorage.setItem('pairedWallet', data.accountIds[0]);
      localStorage.setItem('topic', data.topic);
      setSavedData(d => { d.pairedWalletData = data.metadata; return d });

      data.accountIds.forEach((id) => {
        setSavedData(d => { d.pairedAccounts.push(id); return d });

      });
      savedDataInLocalstorage();
    });
  }
  async function connectToExtension() {
    hashconnect.connectToLocalWallet(savedData.pairingString);
  }
  function savedDataInLocalstorage() {
    let data = JSON.stringify(savedData);
    localStorage.setItem("hashconnectData", data);
  }
  useEffect(() => {
    async function init() {
      let foundData = localStorage.getItem("hashconnectData");
      if (foundData) {
        setSavedData(JSON.parse(foundData));
      }
      await initHashconnect();
      savedDataInLocalstorage();
      spk(savedData.pairedAccounts[0] || 'guest')
    }
    init();
  }
    , [])

  return (
    <button
      className='hashconnect'
      onClick={async () => {
        await connectToExtension();
        savedDataInLocalstorage();
        setTimeout(() => spk(savedData.pairedAccounts[0] || 'pending'), 1)
        setTimeout(() => spk(savedData.pairedAccounts[0] || 'pending'), 10000)
        setTimeout(() => spk(savedData.pairedAccounts[0] || 'pending'), 20000)
        setTimeout(() => spk(savedData.pairedAccounts[0] || 'timed out'), 30000)
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

