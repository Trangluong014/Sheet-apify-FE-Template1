import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "../features/websites/websiteSlice";
import visitorReducer from "../features/visitors/visitorSlice";
const rootReducer = {
  website: websiteReducer,
  visitor: visitorReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
