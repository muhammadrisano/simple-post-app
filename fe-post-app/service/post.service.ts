import { fetchData, postData } from "@/utils/fetch-adapter"
import { Category } from "./category.service"

export interface Post {
    id: number,
    title: string,
    description: string,
    category: Category,
    slug: string,
    user_id: number,
    created_at: string,
    updated_at: string
} 


export const getPosts = async (params = {}) => {
    return fetchData('api/posts', params)
}

export const createPost = async (payload: Pick<Post, 'title' | 'description' > & {category_id: number}) => {
    return postData('api/posts', payload)
}