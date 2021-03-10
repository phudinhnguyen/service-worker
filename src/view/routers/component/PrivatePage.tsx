import DefaultLayout from "src/view/shared/components/layout/index";
import React from "react";
import { privateRouter } from "../index";
import ShowRouter from "./ShowRouter";

interface Props {
  privateLogin?: boolean;
}

const PrivatePage: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <ShowRouter routers={privateRouter} />
    </DefaultLayout>
  );
};
export default PrivatePage;
