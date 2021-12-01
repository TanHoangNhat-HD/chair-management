import { Breadcrumb, Layout } from 'antd';
import HeaderComponent from 'components/layout/Header/Header.component';
import { useTranslation } from 'react-i18next';

const { Content, Footer } = Layout;

export default function UserManagement() {
  const { t } = useTranslation();

  return (
    <Layout className="site-layout">
      <HeaderComponent headerTitle={t('user.management')} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          User Management
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Chair Management ©2021 Created by HDWebSoft</Footer>
    </Layout>
  );
}
