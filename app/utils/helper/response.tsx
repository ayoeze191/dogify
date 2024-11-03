import { AxiosError } from "axios";

interface DataType {
  message: string[];
}

interface AxiosResponse {
  data: DataType;                
  status: number;          
  statusText: string;         
}

export interface ErrorResponseData {
  message: string;
  data?: Record<string, object>; 
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const response = (res: AxiosResponse | null, error: AxiosError<ErrorResponseData> | null | any) => {
  if (res) {
    return [res.data, null]; // Return response data if available
  }
  
  return [
    null,
    {
      message: error?.response?.data?.message || "", 
      data: error?.response?.data?.data || {},       
      error,                                        
    },
  ];
};