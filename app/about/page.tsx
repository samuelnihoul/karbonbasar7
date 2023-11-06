'use client'
import React from 'react'
import Counter from '../../components/Counter'
import { useTranslation } from 'react-i18next'
export default function About() {
    const { t } = useTranslation(["about"])
    return (
        <div className='min-h-[80vh] minw-[80%] m-auto align-center p-[5vw]'>
            <section >

                <h1 className='text-xl text-center mt-[2.5vh] mb-[2.5vh]'>{t('about')}</h1>
                <p>{t('karbonbasaris')}</p><br></br>
                <p>{t('soonkarbonbasar')}</p>

            </ section>
            <section>
                <h2 className='mb-[2.5vh] mt-[2.5vh] text-xl text-center'> {t('FAQ')}</h2>
                <ul><li>
                    <b>{t('whatisa')}</b><hr></hr><p>{t('nftstandsfor')}</p></li>

                </ul>

            </section><Counter></Counter></div>
    )
}
