import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-ca-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">{t('dashboard.loadingDashboard')}</p>
      </div>
    </div>
  );
};

export default Index;