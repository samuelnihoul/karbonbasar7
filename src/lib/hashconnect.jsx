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
  const [user, setUser] = useState(t('connectwithhashpack'))
  function setUpEvents() {
    hashconnect.pairingEvent.on((data) => {
      //does not take into account more accounts being paired !!!
      alert(`Welcome ${data.accountIds[0]}`)
      localStorage.setItem('paired wallet', data.accountIds[0])
      setUser(data.accountIds[0])
    }
    );
  }
  useEffect(
    () => {
      let ignore = false;
      async function init() {
        await hashconnect.init(appMetadata)
        setUpEvents()
        let state = await hashconnect.connect()
        if (!ignore) {

          let pairingString = hashconnect.generatePairingString(state, 'mainnet', true)
          localStorage.setItem('topic', pairingString)
        }
      }
      init()
      return () => {
        ignore = true
      }
    }, []
  )

  return (
    <button
      className='hashconnect'
      onClick={
        async () => {
          await navigator.clipboard.writeText(localStorage.getItem('topic'))
          alert('Here is your pairing key. Click the Earth icon in Hashpack and paste there to pair. We copied it to your clipboard for you. Key: ' + localStorage.getItem('topic'))
        }
      }
    >
      {user}
    </button>
  );
}

export async function pay(price) {
  alert('This feature has not been extensively tested. If you run into any issue, email us at contact@harmonia.eco')
  let tx = await createTX(localStorage.getItem('paired wallet'), price)
  //send the transaction
  const transaction = {
    topic: localStorage.getItem('topic'),
    byteArray: tx,
    metadata: {
      accountToSign: localStorage.getItem('paired wallet'),
      returnTransaction: false
    }
  }
  let response = await hashconnect.sendTransaction(localStorage.getItem('topic'), transaction)
  alert(JSON.stringify(response));
  fetch('https://harmonia-ekoutils-mhbcpntktq-ew.a.run.app/notify', {})
  alert('dontforget')
}

