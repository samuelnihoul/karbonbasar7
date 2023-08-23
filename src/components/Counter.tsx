import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { useTranslation } from 'react-i18next'
import db from '../lib/firebase'
const CounterOne = () => {
    const { t } = useTranslation(["offset"])
    const [viewed, setViewed] = useState(false);
    const [data, setData] = useState<DocumentData>({})
    async function fetchData() {
        const snapshot = await getDocs(collection(db, 'KPIs'))
        setData(snapshot.docs[0].data())

        const viewChangeHandler = (isVisible: boolean) => {
            if (isVisible) setViewed(true);
        };

        useEffect(
            () => {
                fetchData();
            }, []
        )
        return (
            <div className="column">
                <h2 className="text-center text-xl mt-[2.5vh] mb-[3vh]">{t('lovestorymetrics')}</h2>
                <div className="text-center">
                    <div className="text-center align-center justify-center flex">{
                        <div
                            key={a}
                            data-aos-delay={`${b}00`}
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
                                    <CountUp decimals={0} end={viewed ? b : 0} />
                                </VisibilitySensor>
                            </span>
                            <span className="mr-12" >
                                {a}
                            </span>
                        </div>}
                    </div>
                </div>
            </div>
        );
    };

    export default CounterOne;
