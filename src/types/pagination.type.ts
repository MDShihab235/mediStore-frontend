// src/types/pagination.ts

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  pagination: Pagination;
};
