import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '50px' }}>
      <h1>{t('notfound')}</h1>
    </div>
  );
}
