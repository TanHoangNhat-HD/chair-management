import { Layout, Menu } from 'antd';
import { useState } from 'react';
import style from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import { TeamOutlined, DesktopOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export default function SideBar() {
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);

  const handleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className={style.sidebar__header}>
        <div className={style.sidebar__logo}></div>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          <Link to="/admin/chairs">Chair Management</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <Link to="/admin/users">User Management</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
