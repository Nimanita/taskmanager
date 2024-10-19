import appreducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:appreducer,
  });

export default store;