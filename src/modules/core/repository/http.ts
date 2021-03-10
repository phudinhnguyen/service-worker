import CONFIG from "@config/index";
import notificationByLanguage from "@view/shared/components/Notification";
import axios from "axios";

export interface IParamsHTTP {
  method?: "get" | "post" | "delete" | "put";
  path: string;
  payload?: any
  params?
  config?: {
    isPrivate?: boolean;
    isFormData?: boolean;
  };
  showSuccess?:boolean,
  showError?:boolean,
  convert?: (res) => any
}

class HTTPRepository {
  private service: any;

  constructor(baseURL?) {
    let service = axios.create({
      baseURL: baseURL || CONFIG.API_BASE_URL,
    });
    this.service = service;
  }

  private handleSuccess(response, convert, showSuccess) {
    if(showSuccess){
      notificationByLanguage({
        message: response?.data?.message,
        type: "success"
      })
    }
    const convertedData = convert(response.data?.data)
    return Promise.resolve(convertedData);
  }

  private handleError(error, showError) {
    let status = error.response?.status;
    switch (status) {
      case 400: {
        if(showError){
        notificationByLanguage({
          message: error?.data?.message,
          type: "success"
        })
        }
        break
      }
      case 401: {
        // window.location.reload();
        // window.location.href = `/#/login`;
        break;
      }
      case 500: {
        break;
      }
      default: {
        break;
      }
    }
    return Promise.reject(error);
  }

  private preparePrivateHeaderConfig() {
    const token = localStorage.getItem(CONFIG.TOKEN_FEILD)

    return {
      Authorization: `Bearer ${ token }`,
    };
  }

  private getDefaultConfig({ isPrivate, isFormData }: any = {}) {
    const config = {
      headers: {},
    };

    if (isPrivate) {
      const privateHeaderConfig = this.preparePrivateHeaderConfig();
      Object.assign(config.headers, privateHeaderConfig);
    }

    if (isFormData) {
      Object.assign(config.headers, {
        "Content-Type": "multipart/form-data",
      });
    }

    return config;
  }

  async execute({
    method = "get",
    path = "",
    payload,
    config = {},
    params,
    showSuccess = true,
    showError = true,
    convert = (res) => res
  }: IParamsHTTP) {
    let arg: Array<any>;
    const { isPrivate = true, isFormData = false } = config;

    switch (method) {
      case "get": {
        if (params) {
          arg = [
            path,
            {
              ...this.getDefaultConfig({ isPrivate }),
              params
            }
          ];
        } else {
          arg = [ path, this.getDefaultConfig({ isPrivate }) ];
        }
        break;
      }
      case "delete": {
        arg = [ path, this.getDefaultConfig({ isPrivate }) ];
        break;
      }

      case "post":
      case "put": {
        arg = [ path, payload, this.getDefaultConfig({ isPrivate, isFormData }) ];
        break;
      }

      default:
        break;
    }

    return await this.service[ method ](...arg)
      .then((response) => this.handleSuccess(response, convert, showSuccess))
      .catch((error) => this.handleError(error, showError));
  }
}

const httpRepository = new HTTPRepository()

export default httpRepository