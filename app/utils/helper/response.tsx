import { AxiosError } from "axios";

interface DataType {
  message: string[];
}

interface AxiosResponse {
  data: DataType;                
  status: number;          
  statusText: string;         
}

interface ErrorResponseData {
  message: string;
  data?: Record<string, unknown>; 
}

export const handleResponse = (res: AxiosResponse | null, error: AxiosError<ErrorResponseData> | null) => {
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