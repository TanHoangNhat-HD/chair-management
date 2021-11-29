import { Layout, Menu } from 'antd';
import { useState } from 'react';
import style from './SideBar.module.scss';
import { Link } from 'react-router-dom';

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
        <Menu.Item key="1">
          <Link to="/admin/chairs">Chair</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/users">User</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
