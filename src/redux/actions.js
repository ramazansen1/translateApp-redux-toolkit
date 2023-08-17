import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../helpers/constans";

// dillerin verisini çeker
export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    //* asekron işlemler
    const res = await axios.get(
      "https://text-translator2.p.rapidapi.com/getLanguages",
      options
    );

    const languages = res.data.data.languages;
    // console.log(languages);

    /*
     * diziyi map ile dönüp
     * bütün code key'lerini value'a çevirir.
     * bütün name key'lerini label'a çevirir.
     */

    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));

    // console.log(newLanguages);

    //* store a göndereilecek değeri return edicez.
    return newLanguages;
  }
);

// dillerin çevirini yapar

export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (props) => {
    // istek için gerekli olan ayarlar
    // sabit verilerden oluşmadığı dinamik verilerden oluştuğu için constans'da tutmadım
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.sourceLang.value);
    encodedParams.set("target_language", props.targetLang.value);
    encodedParams.set("text", props.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "51b3d486a0mshf93ff60118c0f9cp1e34dcjsn33a1c24f3b6f",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };
    //* isteğin bütün ilgili verileri options 'da yer aldığı için request yapıoruz.
    const res = await axios.request(options);

    //* çevrilmiş yazıya erişme
    const answer = res.data.data.translatedText;

    //* veriye slice'ta erişebilmek için return ettik
    return answer;
  }
);
