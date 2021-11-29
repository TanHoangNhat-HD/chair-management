import { Layout } from 'antd';
import { Outlet } from 'react-router';
import SideBar from './SideBar/SideBar';

export function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Outlet />
    </Layout>
  );
}
