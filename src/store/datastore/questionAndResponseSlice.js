import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const questionAndResponseSlice = createSlice({
  name: "fieldData",
  initialState,
  reducers: {
    setFieldData: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("fieldData", JSON.stringify(state));
    },
  },
});

export const { setFieldData } = questionAndResponseSlice.actions;
export default questionAndResponseSlice.reducer;
