import { fetchData } from "@/utils/fetch-adapter"

export interface Category {
    id: number,
    name: string
}

export const getCategory = async (params = {}) => {
   return fetchData('api/post-categories', params)
}
