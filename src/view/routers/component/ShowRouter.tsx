import React from "react";
import { Route, Switch } from "react-router-dom";

const ShowRouter = ({ routers }) => {

  const result = routers.map((router, index) => {
    if (true) {
      return <Route
        key={router.path}
        path={router.path}
        exact={router.exact}
        component={router.component}
      />
    }
  });

  return <Switch>{result}</Switch>;
};

export default ShowRouter;
