import { AxiosError } from "axios";

interface AxiosResponse<T = unknown> {
  data: T;                
  status: number;          
  statusText: string;         
}

interface ErrorResponseData {
  message: string; 
  data?: {
    details?: string; 
  };
}

export const response = (res: AxiosResponse, error:AxiosError<ErrorResponseData>) => {
    if (res !== null) return [res.data, null];
    return [
      null,
      {
        message: error?.response?.data?.message || "",
        data: error?.response?.data?.data || {},
        error,
      },
    ];
  };