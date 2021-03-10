import { RootState } from "@modules/core/store/redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useLog = (state, text = "") => {
  useEffect(() => {
    console.log(state, text);
  }, [state]);
};

export const useTranslate = (objKey) => {
  const {currentLanguage} = useSelector((state:RootState) => state.translation)
  const obj: any = {};
  Object.keys(objKey).map((key) => {
    obj[key] = objKey[key][currentLanguage];
  });
  return obj;
};
