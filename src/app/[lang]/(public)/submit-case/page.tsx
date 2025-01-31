import React from 'react';
import { Locale } from '../../../../../i18n-config';
import { useTranslation } from '../../../../../get-dictionary';

const Page: React.FC = async (props: {
    params: Promise<{lang:Locale}>
}) => {
    //TODO: use translation
    const  t  = await useTranslation(props.params.lang);
    return (
        <div>
                    <div>
                        <h1>{t('submitCase.title')}</h1>
                        <p>{t('submitCase.description')}</p>
                    </div>
        </div>
    )
}
export default Page