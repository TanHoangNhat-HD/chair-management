import { Layout } from 'antd';
import HeaderComponent from 'components/layout/Header/Header.component';
import { Outlet } from 'react-router';

export default function ChairManagement() {
  return (
    <Layout className="site-layout">
      <HeaderComponent headerTitle="Chair Management" />

      <Outlet />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Chair Management ©2021 Created by HDWebSoft
      </Layout.Footer>
    </Layout>
  );
}
