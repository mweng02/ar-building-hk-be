interface ApiResponse {
  status: string;
  data?: object;
  error?: ErrorObject;
}

interface ErrorObject {
  code?: string;
  message: string;
  stack?: string;
}

export {
  ErrorObject,
  ApiResponse,
};
