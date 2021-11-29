import { Breadcrumb, Layout, Table, Tag } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import HeaderComponent from 'components/layout/Header/Header.component';
import { useEffect } from 'react';
import { Chair } from 'models';
import { chairActions, selectChairList } from '../chairSlice';

const { Content, Footer } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Material',
    dataIndex: 'material',
    key: 'material',
    render: (material: Array<string>) => (
      <>
        {material.map((m) => (
          <Tag key={m} color="green">
            {m.toUpperCase()}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: Chair) => <a>Delete {record.id}</a>,
  },
];

export default function ChairManagement() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectChairList);
  useEffect(() => {
    dispatch(
      chairActions.fetchChairList({
        _page: 1,
        _limit: 15,
      })
    );
  }, []);
  return (
    <Layout className="site-layout">
      <HeaderComponent headerTitle="Chair Management" />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Chairs</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Table columns={columns} dataSource={data}></Table>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Chair Management ©2021 Created by HDWebSoft</Footer>
    </Layout>
  );
}
