import { ErrorMessage } from '@hookform/error-message';
import { Breadcrumb, Button, Form, Input, Layout, Select } from 'antd';
import chairApi from 'api/chairApi';
import { Chair } from 'models';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

export default function AddEditChair() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        <Form.Item label={t('name')}>
          <Controller
            name="name"
            control={control}
            rules={{ required: `'${t('name')}' ${t('require')}` }}
            render={({ field }) => <Input allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="name" />
        </Form.Item>
        <Form.Item label={t('price')}>
          <Controller
            name="price"
            control={control}
            rules={{
              pattern: { value: /\d+/, message: `'${t('price')}' ${t('be-a-number')}` },
              min: { value: 0, message: `'${t('price')}' ${t('pos-number')}` },
            }}
            render={({ field }) => <Input suffix="VND" allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="price" />
        </Form.Item>
        <Form.Item label={t('weight')}>
          <Controller
            name="weight"
            control={control}
            rules={{
              pattern: { value: /\d+/, message: `'${t('weight')}' ${t('be-a-number')}` },
              min: { value: 0, message: `'${t('weight')}' ${t('pos-number')}` },
            }}
            render={({ field }) => <Input suffix="Kg" allowClear {...field} />}
          />
          <ErrorMessage errors={errors} name="weight" />
        </Form.Item>
        <Form.Item label={t('material')}>
          <Controller
            name="material"
            control={control}
            render={({ field }) => (
              <Select mode="multiple" allowClear {...field}>
                <Select.Option value="net">{t('net')}</Select.Option>
                <Select.Option value="fabric">{t('fabric')}</Select.Option>
                <Select.Option value="plastic">{t('plastic')}</Select.Option>
                <Select.Option value="alloy">{t('alloy')}</Select.Option>
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
              {chairId ? t('update') : t('add')}
            </Button>
            <Button style={{ width: '48%' }} htmlType="button" onClick={handleReset}>
              {t('reset')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}
