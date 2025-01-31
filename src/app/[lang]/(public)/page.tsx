import Button  from '@/app/components/Button';
import { useTranslation } from '../../../../get-dictionary';
import LoginButton from './components/LoginButton.client';
import { Locale } from '../../../../i18n-config';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = await useTranslation(lang);
  return (
    <div className='flex flex-row justify-center items-center h-screen gap-4'>
      <Button variant="contained" color="primary" title={t('submitCase.title')} href="/submit-case" />
      <LoginButton />
    </div>
  );
}
