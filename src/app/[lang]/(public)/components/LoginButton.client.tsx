'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import  Button  from '@/app/components/Button';
import { useTranslations } from '@/providers/translations-provider.client';
const LoginButton = () => {
    const {user,isLoading} = useUser();
  const  t = useTranslations( );
  const isLoggedIn = user && !isLoading;
  return (
      <Button variant="contained" color="secondary" title={isLoggedIn?t('I am Admin'):t('home.login')} href={isLoggedIn?'/leads':'/api/auth/login'} />
  );
}

export default LoginButton

