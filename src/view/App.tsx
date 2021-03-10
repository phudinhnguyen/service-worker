import React, { Suspense, useEffect, useMemo } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { privateRouter, publicRouter } from "./routers";
import authenticationPresenter from "@modules/authentication/presenter";
import PrivatePage from "./routers/component/PrivatePage";

import "antd/dist/antd.css";
import "@styles/styles.scss";
import useViewModel from "@modules/core/viewModel";
import PublicPage from "./routers/component/PublicPage";
import { DefaultRootState, useSelector } from "react-redux";

const App = () => {
  const { getState, update, updateSilent } = useViewModel<{ name: string }>({
    name: "phuc",
  });
  // console.log("re-render")

  const { getToken } = authenticationPresenter;
  const history = useHistory();
  const token = getToken();

  const test = useSelector((state: DefaultRootState) => state.profile);
  console.log(test, "testtesttest");

  useEffect(() => {
    if (token) {
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Switch>
      {token || test.statusLogin ? (
        <Suspense fallback={<></>}>
          <PrivatePage />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <PublicPage />
        </Suspense>
      )}
    </Switch>
  );
};

export default App;
