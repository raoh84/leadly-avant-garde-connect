
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{t('auth.welcome')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.description')}
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
