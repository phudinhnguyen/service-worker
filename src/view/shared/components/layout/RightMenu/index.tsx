import React, { useCallback } from "react";
import "./styles.scss";

interface Iprops {
  arrayAction?: Array<{
    icon: string;
    name: string;
    handleAction?: any;
    isAllow?: boolean;
    disable?: boolean;
  }>;
}

const RightMenu = ({ arrayAction }: Iprops) => {
  const changeAction = (index) => {
    if (!arrayAction[index].disable) {
      arrayAction[index].handleAction();
    }
  };
  if (
    arrayAction.filter((i) => {
      return typeof i.isAllow == "undefined" || i.isAllow;
    }).length == 0
  ) {
    return <></>;
  }

  if (arrayAction?.length == 0) {
    return <></>;
  }

  return (
      <div className="right">
        <div className="right__menu">
          <div className="drag" id="handle"></div>
          <div className="right__menu__content">
            {arrayAction.map((item, index) => {
              if (item.isAllow == false) {
                return <></>;
              } else {
                return (
                  <a
                    key={index}
                    className={`item ${item.disable == true ? "no-click" : ""}`}
                    onClick={() => changeAction(index)}
                  >
                    <div className="item__icon">
                      <i className={item.icon} aria-hidden="true"></i>
                    </div>
                    <p className="item__name">{item.name}</p>
                  </a>
                );
              }
            })}
          </div>
        </div>
      </div>
  );
};

export default RightMenu;
