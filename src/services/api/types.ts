export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  errors: [];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  data: null;
  errors: Record<string, unknown>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
