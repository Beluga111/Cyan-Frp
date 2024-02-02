import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Router from 'next/router';
import Message from '../components/Message';
import api from '../config/config';

// 401 豁免路径
const exemptPaths = [
  '/',
  '/auth/login',
    '/ServiceNotFound',
];

const BASE_URL = api.api;
class ApiClient {
  private axios: AxiosInstance;



  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
    this.axios.interceptors.request.use(
        // @ts-ignore
      this.handleRequest.bind(this), // 绑定 this 上下文
    );
    this.axios.interceptors.response.use(
      this.handleSuccessResponse.bind(this), // 绑定 this 上下文
      this.handleErrorResponse.bind(this) // 绑定 this 上下文
    );
  }

    private handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };

  private handleSuccessResponse = (response: AxiosResponse) => {
    return response.data;
  };

    private handleErrorResponse = (error: AxiosError) => {
        if (error.status === 429) {
      Message.error({content: "请求次数过多！", duration: 2000})
        } else if (error.status === 401) {
    if (!exemptPaths.includes(location.pathname)) {
      if (localStorage.getItem('token') !== null) {
        Message.error({content: "您的登录状态已失效，无权访问此页面，正在为您重新登录……", duration: 2000}); 
      } else {
        Message.error({content: "您还未登录，无权访问此页面，正在重新登录……", duration: 2000});
      }
      Router.push("/auth/login");
    }
        } else if (error.status === 502) {
    Message.error({ content: "ME Frp API 状态异常，请联系管理员!" ,duration: 1000 })
  }
  return Promise.reject(error);
  };

  get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.delete<T>(url, config);
  }
}

const apiClient = new ApiClient(BASE_URL);

export default apiClient;