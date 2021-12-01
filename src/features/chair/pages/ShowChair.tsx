import { Breadcrumb, Button, Layout, Space } from 'antd';
import chairApi from 'api/chairApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Chair, ListParams } from 'models';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { chairActions, selectChairFilter, selectChairList } from '../chairSlice';
import ChairFilter from '../components/ChairFilter';
import ChairTable from '../components/ChairTable';

export default function ShowChair() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectChairFilter);
  const chairList = useAppSelector(selectChairList);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEditChair = (chairId: string) => {
    navigate(`${location.pathname}/edit/${chairId}`);
  };

  const handleDeleteChair = async (chairId: string) => {
    try {
      await chairApi.delete(chairId);
      dispatch(chairActions.setFilters({ ...filter }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    dispatch(chairActions.setFilters({ ...filter, _page: page, _limit: pageSize }));
  };

  const handleSearch = (filter: ListParams) => {
    dispatch(chairActions.setFiltersDebounce(filter));
  };

  const handleFilter = (filter: ListParams) => {
    dispatch(chairActions.setFilters(filter));
  };
  useEffect(() => {
    dispatch(chairActions.fetchChairList(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Space style={{ position: 'absolute', top: '75px', right: '48px', zIndex: 10 }}>
        <Link to="/admin/chairs/add">
          <Button type="primary">Add new chair</Button>
        </Link>
      </Space>
      <Layout.Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Chairs</Breadcrumb.Item>
        </Breadcrumb>
        <ChairFilter filter={filter} onSearch={handleSearch} onFilter={handleFilter} />
        <ChairTable
          chairList={chairList as Chair[]}
          onEdit={handleEditChair}
          onDelete={handleDeleteChair}
          onPageChange={handlePageChange}
        />
      </Layout.Content>
    </>
  );
}
