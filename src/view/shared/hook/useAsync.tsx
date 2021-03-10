import { useState, useCallback, useEffect } from "react";

interface IState {
  status: "ready" | "loading" | "error";
  value: any;
  error: any;
}

interface IOptions {
  showError?: boolean;
  showSuccess?: boolean;
}

const useSingleAsync = (asyncFunction?, options?: IOptions) => {
  if (!asyncFunction) return;
  const { showError = true, showSuccess = false } = options || {};

  const [state, setState] = useState<IState>({
    status: "ready",
    value: null,
    error: null,
  });

  const onSuccess = (response) => {
    setState((prevState) => ({
      ...prevState,
      status: "ready",
      value: response,
    }));
    return Promise.resolve(response);
  };

  const onError = (error) => {
    setState((prevState) => ({
      ...prevState,
      status: "error",
      error: error,
    }));
    return Promise.reject(error);
  };

  const execute = useCallback(
    async (...args) => {
      setState((prevState) => ({
        ...prevState,
        status: "loading",
        value: null,
        error: null,
      }));

      return await asyncFunction(...args)
        .then((response) => {
          return onSuccess(response);
        })
        .catch((error) => {
          return onError(error);
        });
    },
    [asyncFunction]
  );

  return { execute, ...state };
};

interface IMutipleAsync extends IState {
  execute: Function;
}

export const useAsync = function (
  ...params: Array<Function | [Function, IOptions?]>
) {
  let result: Array<IMutipleAsync> = [];

  params.map((item) => {
    let prepare: any = [item];
    if (Array.isArray(item)) {
      prepare = item;
    }
    result.push(useSingleAsync(...prepare));
  });
  return result;
};
