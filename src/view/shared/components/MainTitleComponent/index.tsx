import React from "react";
import { useLocation, useParams } from "react-router";
import listNav from "../layout/Sidebar/_nav";
import BreadcumbComponent from "./BreadcumbComponent";
import TitleComponent from "./TitleComponent/index";
interface Breadcrumbs {
  name: string;
  href?: string;
}
interface props {
  classTitle?: string;
  classBreadcumb?: string;
  title?: any;
  breadcrumbs: Array<any>;
}
const MainTitleComponent = ({
  classTitle,
  classBreadcumb,
  title,
  breadcrumbs
}: props) => {

  // const callParam = useParams();
  // console.log(callParam);
  
  // const arrayLocation = useLocation().pathname.split("/").filter(x => x != "");

  // const breadcrumbs = () => {
  //   return arrayLocation.map((path, index) => {
  //     if(index == arrayLocation.length - 1){
  //       console.log("true");
  //     }
  //     return {name: path}
  //   })
  // }
  // const breadcb = breadcrumbs();
  // const titleIn = title ? title : breadcb[breadcb.length - 1].name;
  const titleIn = title ? title : breadcrumbs[breadcrumbs.length - 1].name;
  
  return (
    <>
      <TitleComponent title={titleIn} className={classTitle} />
      <BreadcumbComponent
        breadcrumbs={breadcrumbs}
        className={classBreadcumb}
      />
    </>
  );
};

export default MainTitleComponent;
