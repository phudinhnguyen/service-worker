import { notification } from "antd";
import { serverTranslateKey } from "@translateKey/index";
import { CURRENT_LANGUAGE } from "@config/index";

  interface INotification {
    message:string 
  type: 'open' | 'success' | 'error'
  }

 const notificationByLanguage = ({message = "message", type = "open"}:INotification) => {

  const language = localStorage.getItem(CURRENT_LANGUAGE);
  let decription = "You didn't translate in serverTranslateKey yet";
  let messageType = "You didn't translate in serverTranslateKey yet";
  if (serverTranslateKey[message] && serverTranslateKey[message][language]) {
    decription = serverTranslateKey[message][language];
  }

  if (serverTranslateKey[type] && serverTranslateKey[type][language]) {
    messageType = serverTranslateKey[type][language];
  }
  notification[type]({
    message: messageType,
    description: decription,
    placement: "bottomRight",
  });
};


export default notificationByLanguage