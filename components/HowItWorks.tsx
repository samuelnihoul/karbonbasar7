import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
    const { t } = useTranslation(["home"])
    return (
        <section className='text-center'>
            <h2 className='mb-[2.5vh] mt-[2.5vh] text-2xl'>{t('How It Works')}</h2>
            <p className='p-2 pb-[50px]'>{t('On Karbon Basar, you can find a selection of most efficient emission reduction projects from across the globe.')}</p>
            <img src='/assets/images/example2.png' className='m-auto'></img>
            <a href='/reductions' className='mt-[12px] text-l'>{t('tryit')}</a>
        </section >
    )
}
