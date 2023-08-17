import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, getAnswer } from "./actions";

const initialState = {
  languages: [],
  answer: "",
  isLoading: true,
  isError: false,
};

// veri istediği aksiyonu

const translateSlice = createSlice({
  name: "translateSlice",
  initialState,
  //! thunk'da reducers yerine extraReducers kullanılır.
  extraReducers: {
    //* verinin gelmesini bekleme durumu
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },

    //* verinin başarılı bir şekilde gelme durumu
    [getLanguages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    },

    //* verinin başarısız olma durumu
    [getLanguages.rejected]: (state) => {
      state.isError = "Dilleri Alırken Bir Hata Oluştu";
    },

    //* çeviri isteklerini yönetme
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },

    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.answer = action.payload;
    },

    [getAnswer.rejected]: (state) => {
      state.isLoading = false;
      state.isError = "Çevirirken bir hata oluştu..";
    },
  },

  //* asekron bir aksiyon olmadığı için extraReducers içersinde tanımlama yapmaya gerek yok
  reducers: {
    //* değiştirme yaptığımızda temizleme aksiyonu
    // clearAnswer: (state) => {
    //   state.answer = "";
    // },
    changeAnswer: (state, action) => {
      state.answer = action.payload;
    },
  },
});

export const { changeAnswer, clearAnswer } = translateSlice.actions;
export default translateSlice.reducer;
