import { CURRENT_LANGUAGE } from "@config/index";
import store from "@modules/core/store/redux";
import translateStore from "@modules/translation/translateStore";
import { Button, Dropdown, Menu } from "antd";
import React, { useEffect } from "react";
import "./styles.scss";
import authenticationPresenter from "@modules/authentication/presenter";
import profileStore from "@modules/authentication/profileStore";
import { useHistory } from "react-router";

const HeaderComponent = () => {
  const history = useHistory();

  const changeLanguage = (language: "USA" | "VNM") => {
    store.dispatch(translateStore.actions.updateLanguage(language));
    localStorage.setItem(CURRENT_LANGUAGE, language);
  };
  const logoutUser = () => {
    authenticationPresenter.removeToken();
    store.dispatch(profileStore.actions.removeProfile());
    history.push("/login");
  };

  const menu = (
    <Menu className="dropdown-menu">
      <Menu.Item>
        <a onClick={() => changeLanguage("USA")}>ENG</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => changeLanguage("VNM")}>VNM</a>
      </Menu.Item>
    </Menu>
  );
  const user = (
    <Menu className="dropdown-menu">
      <Menu.Item>
        <a onClick={() => changeLanguage("USA")}>Change Password</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => logoutUser()}>Logout</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header-component">
      <div className="header-component__language">
        <Dropdown overlay={menu} placement="bottomCenter">
          <div className="icon__language">
            <i className="fas fa-language"></i>
          </div>
        </Dropdown>
      </div>
      <div className="header-component__identify">
        <p className="identify__hi">Hello</p>
        <h4 className="identify__admin">Admin</h4>
      </div>
      <div className="header-component__dropdown">
        <div className="header-component__dropdown-avatar">
          <Dropdown overlay={user} placement="bottomCenter">
            <span className="icon__avatar">
              <i className="fas fa-user"></i>
            </span>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
