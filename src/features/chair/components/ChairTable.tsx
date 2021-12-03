import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Table, Tag } from 'antd';
import { useAppSelector } from 'app/hooks';
import { Chair } from 'models';
import { TFunction, useTranslation } from 'react-i18next';
import { selectChairPagination } from '../chairSlice';

interface MaterialColor {
  [key: string]: string;
}

const materialColor: MaterialColor = {
  net: 'cyan',
  fabric: 'orange',
  plastic: 'purple',
  alloy: 'gold',
};

function renderColumns(
  onEdit: (chairId: string) => void,
  onDelete: (chairId: string) => void,
  t: TFunction
) {
  return [
    {
      title: '',
      key: 'edit',
      width: 50,
      render: (text: string, record: Chair) => (
        <Button
          onClick={() => onEdit(record.id as string)}
          type="link"
          icon={<EditFilled style={{ color: '#52c41a', fontSize: '20px' }} />}
        />
      ),
    },
    {
      title: t('name'),
      dataIndex: 'name',
      width: 450,
      key: 'name',
      render: (text: string) => <Button type="link">{text}</Button>,
    },
    {
      title: t('price'),
      dataIndex: 'price',
      width: 100,
      key: 'price',
    },
    {
      title: t('material'),
      dataIndex: 'material',
      key: 'material',
      render: (material: Array<string>) => (
        <>
          {material?.map((m) => (
            <Tag key={m} color={materialColor[`${m}`]}>
              {m.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: t('weight'),
      dataIndex: 'weight',
      width: 150,
      key: 'weight',
    },
    {
      title: t('delete'),
      key: 'delete',
      width: 80,
      render: (text: string, record: Chair) => {
        const handleDeleteRecord = async () => {
          Modal.confirm({
            title: t('modal-confirm'),
            icon: <ExclamationCircleOutlined />,
            okText: t('yes'),
            okType: 'danger',
            cancelText: t('no'),
            onOk() {
              return new Promise((resolve) => {
                setTimeout(async () => {
                  onDelete(record.id as string);
                  resolve('success');
                }, 1000);
              });
            },
          });
        };

        return (
          <Button
            onClick={handleDeleteRecord}
            type="link"
            icon={<DeleteFilled style={{ color: '#f5222d', fontSize: '20px' }} />}
          ></Button>
        );
      },
    },
  ];
}

interface ChairTableProp {
  chairList: Chair[];
  onEdit: (chairId: string) => void;
  onDelete: (chairId: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
}

export default function ChairTable({ onEdit, onDelete, onPageChange, chairList }: ChairTableProp) {
  const pagination = useAppSelector(selectChairPagination);
  const { t } = useTranslation();
  return (
    <Table
      columns={renderColumns(onEdit, onDelete, t)}
      dataSource={chairList}
      rowKey="id"
      pagination={{
        position: ['bottomLeft'],
        current: pagination?._page,
        pageSize: pagination?._limit,
        total: pagination?._totalRows,
        showSizeChanger: true,
        pageSizeOptions: ['1', '2', '5', '10', '15'],
        onChange: onPageChange,
      }}
    ></Table>
  );
}
