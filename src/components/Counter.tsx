import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import countersData from "../data/counterData.json";

import { useTranslation } from 'react-i18next'
const CounterOne = () => {
    const { t } = useTranslation(["offset"])
    const [viewed, setViewed] = useState(false);

    const viewChangeHandler = (isVisible) => {
        if (isVisible) setViewed(true);
    };

    return (<div className="column"><h2 className="text-xl mt-[2.5vh] mb-[3vh]">{t('lovestorymetrics')}</h2>

        <div className={"container"  }>
            <div className="row">
                {countersData.map((counter, i) => (
                    <div
                        className="col-md-3 counter text-center col-sm-6"
                        key={counter.id}
                        data-aos-delay={`${i}00`}
                        data-aos={"fade-up"}
                        data-aos-duration={1000}
                        data-aos-easing={"ease-in-sine"}
                    >
                        <span
                            className={
                                "text-[4vh] count font-700 "  
                            }
                        >
                            <VisibilitySensor onChange={viewChangeHandler} delayedCall>
                                <CountUp decimals={counter.decimals} end={viewed ? counter.value : 0} />


                            </VisibilitySensor>
                        </span>&nbsp;
                        <span >
                            {t(counter.title)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default CounterOne;
