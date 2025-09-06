// src/config/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/hoboc/api/";

export const API_TOKEN =
  process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN || "1ecdf57453ff0f1ce5ec4fe905ef6c699e0434a3";
