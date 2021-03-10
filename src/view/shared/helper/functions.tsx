import { CURRENT_LANGUAGE } from "@config/index";
import { serverTranslateKey } from "../translateKey";

export const indexOfArrayObject = (array, key: string, value) => {
  if (!Array.isArray(array)) return;
  let index: number;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item[key] == value) {
      index = i;
      break;
    }
  }
  return index;
};

export const debounce = (callback, delay) => {
  let timeoutHandler = null;
  return (...args) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      callback(...args);
      timeoutHandler = null;
    }, delay);
  };
};

export const onScrollBottom = (callBack) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event);
    }
  };
};

export const translateConfirm = (text) => {
  const language = localStorage.getItem(CURRENT_LANGUAGE);

  if (serverTranslateKey[text] && serverTranslateKey[text][language]) {
    return serverTranslateKey[text][language];
  } else if (!serverTranslateKey[text]) {
    return `"You didn't translate ${text} yet"`;
  }
};

export const keyPressOnlyNumber = (evt) => {
  var theEvent = evt || window.event;
  // Handle paste
  if (theEvent.type === "paste") {
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};

