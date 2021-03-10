import React, { useEffect } from "react";
import authenticationPresenter from "@modules/authentication/presenter";
import { withRouter, RouteComponentProps } from "react-router-dom";

function PrivateLogin(Component: React.ComponentType<any | string>) {
  return withRouter(({ history }: RouteComponentProps) => {
    const { getToken } = authenticationPresenter;
    const token = getToken();

    return (
      <>
        <Component privateLogin={!!token} />
      </>
    );
  });
}

export default PrivateLogin;
