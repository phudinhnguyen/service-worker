import React from "react";
import { RightOutlined } from "@ant-design/icons";
// import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";
import { Link } from "react-router-dom";

interface Breadcrumbs {
  name: string;
  href?: string;
}
interface props {
  className?: any;
  breadcrumbs: Breadcrumbs[];
}
const BreadcumbComponent = ({ breadcrumbs, className = "" }: props) => {
  breadcrumbs;
  // const { HOME } = useTranslate(common);

  return (
    <div className={`breadcb ${className}`}>
      <div className="breadcb__li">
        <Link to="/">Home</Link>
        {/* <Link to="/">{HOME}</Link> */}
      </div>

      {breadcrumbs.map(({ name, href }, index) => {
        let lastBreadcumb = index + 1 == breadcrumbs.length;
        let classNameBreadcumb;
        if (lastBreadcumb == true) {
          classNameBreadcumb = "breadcb__last";
        }
        return (
          <>
            <span className="breadcb__icon">
              <RightOutlined />
            </span>
            <div className={`breadcb__li ${classNameBreadcumb} `}>
              <Link to={!lastBreadcumb ? href : undefined}>{name}</Link>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default BreadcumbComponent;
