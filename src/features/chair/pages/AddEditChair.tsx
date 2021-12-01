import { ErrorMessage } from '@hookform/error-message';
import { Breadcrumb, Button, Form, Input, Layout, Select } from 'antd';
import chairApi from 'api/chairApi';
import { Chair } from 'models';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

export default function AddEditChair() {
  const navigate = useNavigate();
  const { chairId } = useParams() as { chairId: string };
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  const handleFormSubmit: SubmitHandler<Chair> = async (value: Chair) => {
    try {
      if (chairId) {
        value.id = chairId;
        await chairApi.update(value);
      } else {
        await chairApi.add(value);
      }
      navigate('/admin/chairs');
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    reset({ name: '', price: undefined, weight: undefined, material: [] });
  };

  useEffect(() => {
    if (!chairId) return;
    (async () => {
      try {
        const data: Chair = await chairApi.getById(chairId);
        setValue('name', data.name);
        setValue('price', data.price);
        setValue('weight', data.weight);
        setValue('material', data.material);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chairId, setValue]);

  return (
    <Layout.Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Chairs</Breadcrumb.Item>
        <Breadcrumb.Item>Addition</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ width: 400 }}
        onFinish={handleSubmit(handleFormSubmit)}
      >
        <Form.Item label="Name">
          <Controller
            name="name"
            control={control}
            rules={{ required: "'Name' is required" }}
            render={({ field }) => <Input allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="name" />
        </Form.Item>
        <Form.Item label="Price">
          <Controller
            name="price"
            control={control}
            rules={{
              pattern: { value: /\d+/, message: "'Price' must be a number" },
              min: { value: 0, message: "'Price' must be a positive number" },
            }}
            render={({ field }) => <Input suffix="VND" allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="price" />
        </Form.Item>
        <Form.Item label="Weight">
          <Controller
            name="weight"
            control={control}
            rules={{
              pattern: { value: /\d+/, message: "'Weight' must be a number" },
              min: { value: 0, message: "'Weight' must be a positive number" },
            }}
            render={({ field }) => <Input suffix="Kg" allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="weight" />
        </Form.Item>
        <Form.Item name="material" label="Material">
          <Controller
            name="material"
            control={control}
            render={({ field }) => (
              <Select mode="multiple" allowClear {...field}>
                <Select.Option value="net">Net</Select.Option>
                <Select.Option value="fabric">Fabric</Select.Option>
                <Select.Option value="plastic">Plastic</Select.Option>
                <Select.Option value="alloy">Alloy</Select.Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <div style={{ justifyContent: 'space-between', display: 'flex' }}>
            <Button
              loading={isSubmitting}
              style={{ width: '48%' }}
              type="primary"
              htmlType="submit"
            >
              {chairId ? 'Update' : 'Add'}
            </Button>
            <Button style={{ width: '48%' }} htmlType="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}
