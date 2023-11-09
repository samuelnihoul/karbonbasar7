import React from 'react';
import Counter from '../components/Counter'
import HowItWorks from "../components/HowItWorks";
import NFTs from "../components/NFTs";
export default function Home() {
    return (
        <>
            <h1 className="text-center text-3xl mt-[10vh] mb-[10vh]">
                KARBON BASAR
            </h1>
            <p className="text-center text-xl">
            Hello
                <br />
                2
                <br />
                ฅ՞•ﻌ•՞ฅ
            </p>
            <NFTs />
            <HowItWorks />
            <Counter />
        </>
    )
}
