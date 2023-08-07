import React from 'react'
import { HashConnect, HashConnectTypes, MessageTypes } from "hashconnect";
import { useEffect, useState } from "react";
import createTX from './hederaRaw'
import { useTranslation } from 'react-i18next'

const hashconnect = new HashConnect(true);
const appMetadata = {
  name: "Karbon Basar",
  description: 'NFT Emission Reduction Marketplace',
  icon: "https://karbonbasar.harmonia.eco/pure2.png",
  url: "karbonbasar.harmonia.eco"
};

export default function HashButton() {
  const { t } = useTranslation(['navbar'])
  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      //does not take into account more accounts being paired !!!
      alert(`paired ${data.accountIds[0]}`)
      localStorage.setItem('paired wallet', data.accountIds[0])
    }
    );
  }


  return (
    <button
      className='hashconnect'
      onClick={
        async () => {
          setUpEvents()
          let initData = await hashconnect.init(appMetadata)
          let state = await hashconnect.connect()
          let pairingString = hashconnect.generatePairingString(state, 'mainnet', true)
          alert(pairingString)
          localStorage.setItem('topic', pairingString)
        }
      }
    >
      {t('connectwithhashpack')}
    </button>
  );
}

export async function pay(price) {
  alert('this hasn')
  let tx = await createTX(localStorage.getItem('paired wallet'), price)
  //send the transaction
  const transaction = {
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
  alert('dontforget')
}

