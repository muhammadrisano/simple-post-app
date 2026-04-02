import { deleteData, fetchData, postData, putData } from "@/utils/fetch-adapter"
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

export const createPost = async (payload: Pick<Post, 'title' | 'description' > & {category_id: number| string}) => {
    return postData('api/posts', payload)
}

export const getPostDetails = async (slug: string) => {
    return fetchData(`api/posts/${slug}`)
}

export const updatePost = async (id: number, payload: Pick<Post, 'title' | 'description' > & {category_id: number| string}) => {
    return putData(`api/posts/${id}`, payload)
}

export const deletePost = async (id: string) => {
    return deleteData(`api/posts/${id}`)
}