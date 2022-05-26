import { $authHost, $host } from "../http/index";

export const createPost = async (post) => {
    const {data} = await $authHost.post('api/posts', post)
    return data
}

export const fetchPosts = async () => {
    const {data} = await $authHost.get('api/posts')
    return data
}

export const upersetPost = async (newPost) => {
    const {data} = await $authHost.put('api/posts/', newPost)
    return data
}

export const deletePost = async (id, userId) => {
    const {data} = await $authHost.delete('api/posts', {data: {id, userId}})
    return data
}