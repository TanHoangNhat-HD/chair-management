import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chair, ListParams, ListResponse, PaginationParams } from 'models';
import { RootState } from 'app/store';

export interface ChairState {
  loading: boolean;
  list?: Chair[];
  filter?: ListParams;
  pagination?: PaginationParams;
}

const initialState: ChairState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 5,
  },
  pagination: {
    _page: 1,
    _limit: 5,
    _total: 10,
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

// reducer
const chairReducer = chairSlice.reducer;
export default chairReducer;
