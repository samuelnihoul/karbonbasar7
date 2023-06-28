import React from 'react'
import { useTranslation } from 'react-i18next'
export default function HowItWorks() {
    const { t } = useTranslation(["home"])
    return (
        <section className='text-center'>
            <h2 className='mb-[2.5vh] mt-[2.5vh] text-2xl'>{t('howitworks')}</h2>
            <p className='p-[5vw] pb-[50px]'>{t('newcollectiblenft')}</p>
            <img src='/example2.png' className='m-auto'></img>
            <p className='z-10 mt-[10vh]'>{t('dontknowhow')}<a href='https://footprint.wwf.org.uk/' target='_blank' className='z-10'>&nbsp;{t('thisfreeand')}</a>&nbsp;{t('hasyourback')}
            < a href='https://imgur.com/a/ZsaAhKh' >&nbsp;{t('yearlyaverage')}</a ></p >
        </section >
    )
}
