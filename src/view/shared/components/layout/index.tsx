import React from "react";
import MainTitleComponent from "../MainTitleComponent";
import HeaderComponent from "./Header";
import SiderComponent from "./Sidebar";
import "./styles.scss";

const DefaultLayout = (props) => {
  
  const breadcrumbs=[{name: "hoa"}];
  return (
    <div className="all-page-component">
      <SiderComponent />
      <div className="right-page-component">
        <HeaderComponent />
        <div className="main-component">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
