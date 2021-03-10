import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import { Button, Card, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import FormItem from "antd/lib/form/FormItem";
import React, { useCallback, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./styles.scss";

import authenticationPresenter from "@modules/authentication/presenter";

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const { location } = useHistory();
  const history = useHistory();

  // const { SIGN_IN, SIGN_UP } = useTranslate(common);

  // console.log(location);
  const handleSubmit = () => {
    authenticationPresenter.login(formData).then((res) => {
      authenticationPresenter.setToken(res);
      history.push("/");
    });
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.value.substr(0, 50).trim();
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    e.charCode == 13 && handleSubmit();
  };

  return (
    <div className="Authen">
      <Card style={{ width: "25vw", margin: "auto" }}>
        <div className="Authen_companyName" style={{ paddingTop: "14vh" }}>
          <h1>MTC</h1>
        </div>
        <div className="Authen_content">
          <h2> SIGN_IN </h2>
          <div className="form-group ">
            <p className="label">Email</p>
            <input
              type="email"
              name="userEmail"
              placeholder="Your email-address"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group ">
            <p className="label">Password</p>
            <input
              key="password"
              type="password"
              name="password"
              placeholder="Password"
              className="input-password"
              onChange={handleChange}
              autoComplete="off"
              onKeyPress={handleKeyPress}
            />
          </div>
          {/* {location?.pathname == "/signup" && (
            <div className="form-group ">
              <p className="label">Confirm Password</p>
              <input
                key="password"
                type="password"
                name="confirmPassword"
                placeholder="Password"
                className="input-password"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          )} */}
          <>
            <div className="checkbox d-flex ">
              <div className="d-flex">
                <Checkbox name="remember" />
                <p className="remember">Remember me</p>
              </div>
              <p className="forgot">
                <a>Forgot your password?</a>
              </p>
            </div>
            <div className="no-account ">
              <p>
                Don't have your accout yet?
                <a href="/signup">
                  <strong> SIGN_UP </strong>
                </a>
                now
              </p>
            </div>{" "}
          </>
          <div className="authen_button">
            <Button
              className=" form-signin-submit-btn normal-button"
              onClick={handleSubmit}
              // loading={asyncLogin.status === "loading"}
            >
              <span className={` ml-2 `}>SIGN_IN</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default withRouter(Login);
