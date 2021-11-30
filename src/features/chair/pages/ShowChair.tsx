import { Breadcrumb, Layout, Table, Tag, Button, Input, Form, Select, Space } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect, useRef } from 'react';
import { Chair } from 'models';
import {
  chairActions,
  selectChairFilter,
  selectChairList,
  selectChairPagination,
} from '../chairSlice';

interface MaterialColor {
  [key: string]: string;
}

const materialColor: MaterialColor = {
  net: 'cyan',
  fabric: 'orange',
  plastic: 'purple',
  alloy: 'gold',
};

const columns = [
  {
    title: '',
    key: 'edit',
    width: 50,
    render: (text: string, record: Chair) => (
      <>
        <Button
          type="link"
          icon={<EditFilled style={{ color: '#52c41a', fontSize: '20px' }} />}
        ></Button>
      </>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 450,
    key: 'name',
    render: (text: string) => <Button type="link">{text}</Button>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
    key: 'price',
  },
  {
    title: 'Material',
    dataIndex: 'material',
    key: 'material',
    render: (material: Array<string>) => (
      <>
        {material.map((m) => (
          <Tag key={m} color={materialColor[`${m}`]}>
            {m.toUpperCase()}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    width: 100,
    key: 'weight',
  },
  {
    title: 'Delete',
    key: 'delete',
    width: 50,
    render: (text: string, record: Chair) => (
      <>
        <Button
          type="link"
          icon={<DeleteFilled style={{ color: '#f5222d', fontSize: '20px' }} />}
        ></Button>
      </>
    ),
  },
];
export default function ShowChair() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectChairList);
  const pagination = useAppSelector(selectChairPagination);
  const filter = useAppSelector(selectChairFilter);
  const typingRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    dispatch(chairActions.setFilters({ ...filter, _page: page, _limit: pageSize }));
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      dispatch(chairActions.setFilters({ ...filter, name_like: value }));
    }, 300);
  };

  const handleFilter = (value: string) => {
    dispatch(chairActions.setFilters({ ...filter, material_like: value }));
    console.log(value);
  };
  useEffect(() => {
    dispatch(chairActions.fetchChairList(filter));
  }, [dispatch, filter]);
  return (
    <Layout.Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Chairs</Breadcrumb.Item>
      </Breadcrumb>
      <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Form.Item style={{ width: 200 }}>
          <Input.Search
            placeholder="Find chair ..."
            allowClear
            onChange={handleSearch}
          ></Input.Search>
        </Form.Item>
        <Form.Item label="Material" style={{ width: 200 }}>
          <Select onChange={handleFilter}>
            <Select.Option value="">All</Select.Option>
            <Select.Option value="net">Net</Select.Option>
            <Select.Option value="fabric">Fabric</Select.Option>
            <Select.Option value="plastic">Plastic</Select.Option>
            <Select.Option value="alloy">Alloy</Select.Option>
          </Select>
        </Form.Item>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          position: ['bottomLeft'],
          current: pagination?._page,
          pageSize: pagination?._limit,
          total: pagination?._totalRows,
          showSizeChanger: true,
          pageSizeOptions: ['1', '2', '5', '10', '15'],
          onChange: handlePageChange,
        }}
      ></Table>
    </Layout.Content>
  );
}
