import React from 'react';
import Products from './products'
import HowItWorks from "../components/HowItWorks";
import NFTs from "../components/NFTs";
import { useTranslation } from 'react-i18next'
export default function home() {
    const { t } = useTranslation(["home"])


    return (
        <>
            <h1 className="text-center text-3xl mt-[10vh] mb-[10vh]">KARBON BASAR</h1>
            <p className="text-center text-xl">{t('cutecollectiblecarbon')}
                <br />{t('andmore')}
                <br></br> ฅ՞•ﻌ•՞ฅ</p>
            <NFTs></NFTs>
            <HowItWorks></HowItWorks>
        </>
    )
}
