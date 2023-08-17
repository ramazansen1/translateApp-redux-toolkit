import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "../redux/actions";
import Select from "react-select";
import { changeAnswer, clearAnswer } from "../redux/translateSlice";

const MainPage = () => {
  const [text, setText] = useState("");

  //* kaynak ve hedef dil state'ine ilk değer verdik. Uygulama başladığında seçili gelicek.
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const dispatch = useDispatch();
  // store' a abone olma
  const store = useSelector((store) => store);
  //   console.log(store);
  const areaRef = useRef();

  //* uygulama başladığı anda dilleri alır.
  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  //   console.log(sourceLang, targetLang);

  //   console.log(store.answer);

  //* state'ler arasında veri değişimi yapar
  const handleClick = () => {
    // dil değiştirme
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //* state'deki cevabı silme > ikinci area' temizlenir
    // dispatch(clearAnswer());
    //* ilk area temizlenir.
    // areaRef.current.value = "";

    //* state'deki answer'ın değiştiğinde dile göre değiştirme yapma
    dispatch(changeAnswer(areaRef.current.value));
    //* ilk area'nın verisini değişiklik yapıldığında kendi dilinde yanında götürme
    areaRef.current.value = store.answer;
  };

  return (
    <>
      <h1>Translate +</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            // burada e'yi göndererek value ve targetlara ulaşıyoruz.
            // bunun nedeni stateler arasında değişim yapmak istiyoruz.
            onChange={(e) => setSourceLang(e)}
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            className="select"
            options={store.languages}
          />
          <textarea
            ref={areaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleClick} className="change-btn">
          Change
        </button>
        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            isLoading={store.isLoading}
            isDisabled={store.isLoading}
            className="select"
            options={store.languages}
          />
          <textarea disabled value={store.answer}></textarea>
        </div>
      </div>
      <button
        onClick={() => dispatch(getAnswer({ text, sourceLang, targetLang }))}
      >
        Translate
      </button>
    </>
  );
};

export default MainPage;
