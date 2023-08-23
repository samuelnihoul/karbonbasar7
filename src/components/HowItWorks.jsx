import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
    const { t } = useTranslation(["home"])
    return (
        <section className='text-center'>
            <h2 className='mb-[2.5vh] mt-[2.5vh] text-2xl'>{t('howitworks')}</h2>
            <p className='p-2 pb-[50px]'>{t('newcollectiblenft')}</p>
            <img src='/assets/images/example2.png' className='m-auto'></img>
            <a href='/reductions' className='mt-[12px] text-l'>{t('tryit')}</a>
        </section >
    )
}
