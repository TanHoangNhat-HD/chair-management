import { Form, Input, Select, Space } from 'antd';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { ListParams } from 'models';
import { useTranslation } from 'react-i18next';

interface ChairFilterProp {
  filter: ListParams;
  onSearch: (filter: ListParams) => void;
  onFilter: (filter: ListParams) => void;
}

export default function ChairFilter({ filter, onSearch, onFilter }: ChairFilterProp) {
  const { t } = useTranslation();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearch(newFilter);
  };

  const handleFilterChange = (value: string) => {
    const newFilter = {
      ...filter,
      material_like: value,
    };
    onFilter(newFilter);
  };

  return (
    <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
      <Form.Item style={{ width: 200 }}>
        <Input.Search
          placeholder={t('find-chair')}
          allowClear
          onChange={handleSearchChange}
        ></Input.Search>
      </Form.Item>
      <Form.Item label={t('material')} style={{ width: 200 }}>
        <Select onChange={handleFilterChange}>
          <Select.Option value="">{t('all')}</Select.Option>
          <Select.Option value="net">{t('net')}</Select.Option>
          <Select.Option value="fabric">{t('fabric')}</Select.Option>
          <Select.Option value="plastic">{t('plastic')}</Select.Option>
          <Select.Option value="alloy">{t('alloy')}</Select.Option>
        </Select>
      </Form.Item>
    </Space>
  );
}
