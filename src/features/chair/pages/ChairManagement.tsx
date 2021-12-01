import { Layout } from 'antd';
import HeaderComponent from 'components/layout/Header/Header.component';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

export default function ChairManagement() {
  const { t } = useTranslation();
  return (
    <Layout className="site-layout">
      <HeaderComponent headerTitle={t('chair.management')} />

      <Outlet />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Chair Management ©2021 Created by HDWebSoft
      </Layout.Footer>
    </Layout>
  );
}
