'use client'
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import db from '../lib/firebase'
export default function Counter() {
    const [viewed, setViewed] = useState(false);
    const [data, setData] = useState<DocumentData>({})
    const viewChangeHandler = (isVisible: boolean) => {
        if (isVisible) setViewed(true);
    };

    async function fetchData() {
        const snapshot = await getDocs(collection(db, 'KPIs'))
        setData(snapshot.docs[0].data())
    }
    useEffect(
        () => {
            fetchData();
        }, []
    )
    return (
        <div className="column">
            <h2 className="text-center text-xl mt-[2.5vh] mb-[3vh]">{'Love Story Metrics'}</h2>
            <div className="text-center">
                <div className="text-center align-center justify-center flex">{
                    Object.keys(data).map(
                        (key: string, index: number) => {
                            return (
                                <div
                                    key={index}
                                    data-aos-delay={`${data[key]}00`}
                                    data-aos={"fade-up"}
                                    data-aos-duration={1000}
                                    data-aos-easing={"ease-in-sine"}
                                >
                                    <span
                                        className={
                                            "mr-4 text-[4vh] font-700 "
                                        }
                                    >
                                        <VisibilitySensor onChange={viewChangeHandler} delayedCall>
                                            <CountUp decimals={0} end={viewed ? data[key] : 0} />
                                        </VisibilitySensor>
                                    </span>
                                    <span className="mr-12" >
                                        {key}
                                    </span>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

