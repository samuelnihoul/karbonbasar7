import React from "react";
import { useTranslation } from 'react-i18next'
export default function Footer() {
    const { t } = useTranslation(["footer"])
    return (
        <div className="justify-end object-center pt-[5vh]"><a href="/terms">{t('termsandconditions')}&nbsp;|&nbsp;</a><a href="/privacy">{" " + t('privacypolicy')}</a><p>{t('anyquestionemail')}</p>
        </div>
    )
}
