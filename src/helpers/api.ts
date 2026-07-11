import axios, { type AxiosRequestConfig } from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const fetcher = <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  return api.get<T>(url, options).then((res) => res.data)
}