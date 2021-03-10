import DefaultLayout from "src/view/shared/components/layout/index";
import React from "react";
import { publicRouter } from "../index";
import ShowRouter from "./ShowRouter";

interface Props {
  privateLogin?: boolean;
}

const PublicPage: React.FC<Props> = () => {
  return <ShowRouter routers={publicRouter} />;
};
export default PublicPage;
