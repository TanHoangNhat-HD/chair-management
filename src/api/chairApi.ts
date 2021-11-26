import { Chair, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';

const chairApi = {
  getAll(params: ListParams): Promise<ListResponse<Chair>> {
    const url = '/chairs';
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Chair> {
    const url = `/chairs/${id}`;
    return axiosClient.get(url);
  },
  add(data: Chair): Promise<Chair> {
    const url = '/chairs';
    return axiosClient.post(url, data);
  },
  update(data: Chair): Promise<Chair> {
    const url = `/chairs/${data.id}`;
    return axiosClient.patch(url, data);
  },
  delete(id: string): Promise<any> {
    const url = `/chairs/${id}`;
    return axiosClient.delete(url);
  },
};

export default chairApi;
