import React, { useState } from "react";
import "./styles.scss";

import listNav from "./_nav";
import { Link, useHistory, useLocation } from "react-router-dom";

const SiderComponent = () => {
  const location = useLocation();

  const renderMenu2 = (listNav: any) => {
    const result = listNav.map((item: any) => {
      const active =
        item.activePath.indexOf(location.pathname) != -1 ? "menu-active" : "";

      return (
        <div className={`menu--component--item ${ active }`} key={item.path}>
          <Link to={item.path} className="item-label">
            <span className="item__icon">{item.icon}</span>
            <div className="item-hover">
              <span className="item-hover__icon">{item.icon}</span>
              <span className="item__nav">{item.title}</span>
            </div>
          </Link>
        </div>
      );
    });
    return result;
  };

  return (
    <div className="sider-component">
      <div className="logo">
        <span className="logo--content">MTC</span>
      </div>
      <div className="menu">
        <div className="menu--decoration--top"></div>
        <div className="menu--component">{renderMenu2(listNav)}</div>
        <div className="menu--decoration--bottom"></div>
      </div>
    </div>
  );
};

export default SiderComponent;
