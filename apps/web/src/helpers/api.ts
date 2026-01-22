import axios, { type AxiosRequestConfig } from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL
})

export async function fetcher<T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
) {
  const res = await api.get<T>(url, options)
  return res.data
}
