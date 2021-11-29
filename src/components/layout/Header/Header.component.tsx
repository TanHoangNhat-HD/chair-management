import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { useAuth } from 'hooks';
import style from './Header.module.scss';
const { Header } = Layout;

export interface HeaderComponentProps {
  headerTitle: string;
}

export default function HeaderComponent({ headerTitle }: HeaderComponentProps) {
  const { logout } = useAuth();

  const menu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        <Button type="link">Config Infomation</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={logout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={style.header}>
      <div className={style.header__left}>
        <h2 className={style.header__title}>{headerTitle}</h2>
      </div>
      <div className={style.header__right}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button style={{ color: 'white' }} size="large" icon={<UserOutlined />} type="link">
            Hi TanHN
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
}