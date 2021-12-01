import { Form, Input, Select, Space } from 'antd';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { ListParams } from 'models';

interface ChairFilterProp {
  filter: ListParams;
  onSearch: (filer: ListParams) => void;
  onFilter: (filter: ListParams) => void;
}

export default function ChairFilter({ filter, onSearch, onFilter }: ChairFilterProp) {
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
          placeholder="Find chair ..."
          allowClear
          onChange={handleSearchChange}
        ></Input.Search>
      </Form.Item>
      <Form.Item label="Material" style={{ width: 200 }}>
        <Select onChange={handleFilterChange}>
          <Select.Option value="">All</Select.Option>
          <Select.Option value="net">Net</Select.Option>
          <Select.Option value="fabric">Fabric</Select.Option>
          <Select.Option value="plastic">Plastic</Select.Option>
          <Select.Option value="alloy">Alloy</Select.Option>
        </Select>
      </Form.Item>
    </Space>
  );
}
