import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chair, ListParams, ListResponse, PaginationParams } from 'models';
import { RootState } from 'app/store';

export interface ChairState {
  loading: boolean;
  list?: Chair[];
  filter: ListParams;
  pagination?: PaginationParams;
}

const initialState: ChairState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 2,
    name_like: '',
    material_like: '',
  },
  pagination: {
    _page: 1,
    _limit: 2,
    _totalRows: 10,
  },
};

const chairSlice = createSlice({
  name: 'chair',
  initialState,
  reducers: {
    fetchChairList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchChairListSuccess(state, action: PayloadAction<ListResponse<Chair>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchChairListFail(state) {
      state.loading = false;
    },
    setFilters(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
  },
});

// actions
export const chairActions = chairSlice.actions;

// selectors
export const selectChairList = (state: RootState) => state.chair.list;
export const selectChairPagination = (state: RootState) => state.chair.pagination;
export const selectChairFilter = (state: RootState) => state.chair.filter;

// reducer
const chairReducer = chairSlice.reducer;
export default chairReducer;
