import { Layout, Menu, Switch } from 'antd';
import { useState } from 'react';
import style from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import { TeamOutlined, DesktopOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Sider } = Layout;

export default function SideBar() {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);

  const handleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  const handleLangChange = (checked: boolean) => {
    checked ? i18n.changeLanguage('en') : i18n.changeLanguage('vi');
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className={style.sidebar__container}>
        <div className={style.sidebar__header}>
          <div className={style.sidebar__logo}></div>
        </div>
        <div className={style.sidebar__body}>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <Link to="/admin/chairs">{t('chair.management')}</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to="/admin/users">{t('user.management')}</Link>
            </Menu.Item>
          </Menu>
          <div className={style.lg__change}>
            <Switch
              onClick={handleLangChange}
              className={style.lg__btn}
              defaultChecked
              checkedChildren="EN"
              unCheckedChildren="VI"
            />
          </div>
        </div>
      </div>
    </Sider>
  );
}
