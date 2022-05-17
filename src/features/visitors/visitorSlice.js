import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  totalPage: 0,
  visitors: null,
  currentVisitors: null,
  pastVisitors: null,
};

const slice = createSlice({
  name: "website",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingVisitors.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUpcomingVisitors.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.visitors = action.payload.itemList;
      })
      .addCase(getUpcomingVisitors.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getCurrentVisitors.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCurrentVisitors.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.currentVisitors = action.payload.itemList;
      })
      .addCase(getCurrentVisitors.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });


    builder
      .addCase(getPastVisitors.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getPastVisitors.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.pastVisitors = action.payload.itemList;
      })
      .addCase(getPastVisitors.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const addNewVisitor = createAsyncThunk(
  "websites/addNewVisitor",
  async (data, { getState }) => {
    const website = getState().website;
    const spreadsheetId = website.website?.spreadsheetId;
    if (spreadsheetId) {
      const ranges = website.website?.ranges;
      const response = await apiService.post(`/google/${spreadsheetId}/${ranges[0]}/`, {
        visited: 0,
        deleted: 0,
        ...data,
      });
      return response.data.data;
    }
  }
);

export const changeSingleVisitor = createAsyncThunk(
  "websites/changeSingleVisitor",
  async ({ rowIndex, data }, { getState, dispatch }) => {
    const website = getState().website;
    const spreadsheetId = website.website?.spreadsheetId;
    if (spreadsheetId) {
      const ranges = website.website?.ranges;
      const response = await apiService.patch(`/google/${spreadsheetId}/${ranges[0]}/${rowIndex}`, data);
      dispatch(getUpcomingVisitors());
      dispatch(getCurrentVisitors());
      dispatch(getPastVisitors());
      return response.data.data;
    }
  }
);

export const getUpcomingVisitors = createAsyncThunk(
  "websites/getUpcomingVisitors",
  async (_, { getState }) => {
    const spreadsheetId = getState().website?.website?.spreadsheetId;
    if (spreadsheetId) {
      const response = await apiService.get(`/item/${spreadsheetId}`, {
        params: {
          visited: 0,
          deleted: 0,
          endtime__gte: new Date().getTime(),
        }
      });
      return response.data.data;
    }
  }
);

export const getCurrentVisitors = createAsyncThunk(
  "websites/getCurrentVisitors",
  async (_, { getState }) => {
    const spreadsheetId = getState().website?.website?.spreadsheetId;
    if (spreadsheetId) {
      const currentTime = new Date().getTime();
      const response = await apiService.get(`/item/${spreadsheetId}`, {
        params: {
          visited: 1,
          deleted: 0,
          starttime__lte: currentTime,
          endtime__gte: currentTime,
        }
      });
      return response.data.data;
    }
  }
);

export const getPastVisitors = createAsyncThunk(
  "websites/getPastVisitors",
  async (_, { getState }) => {
    const spreadsheetId = getState().website?.website?.spreadsheetId;
    if (spreadsheetId) {
      const response = await apiService.get(`/item/${spreadsheetId}`, {
        params: {
          deleted: 0,
          endtime__lte: new Date().getTime(),
        }
      });
      return response.data.data;
    }
  }
);

export default slice.reducer;
