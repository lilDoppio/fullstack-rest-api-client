import React, { useContext, useState } from 'react'
import { Context } from '../..'
import { deletePost } from '../../http/itemAPI'
import { PostForm } from '../PostForm/PostForm'
import { Button } from '../UI/Button/Button'
import styles from './Post.module.css'

export const Post = ({post}) => {
    const {user} = useContext(Context)
    const [formType, setFormType] = useState('')
    const [isPostForm, setIsPostForm] = useState(false)

    const destroyPost = () => {
        const currentPost = {
            id: post.id,
            userId: user.user.id
        }
        console.log(currentPost)
        deletePost(post.id, user.user.id)
            .then(res => user.setRefresh(!user.refresh))
    }

    const openForm = (formType) => {
        setFormType(formType)
        setIsPostForm(true)
    }

    return (
        <div className={styles.post}>
            <PostForm
                isPostForm={isPostForm}
                setIsPostForm={setIsPostForm}
                formType={formType}
                post={post}
            />
            <h2>{post.id}. {post.title}</h2>
            <div>{post.content}</div>
            {post.image !== 'defaultImageState' && <div>{<img src={process.env.REACT_APP_API_URL + post.image}/>}</div>}
            <div className={styles.author}>
                <div className={styles.authorInfo}>
                    <h4>Author: {post.userName}</h4>
                    <h4>{post.date}</h4>
                </div>
                {post.userId === user.user.id && 
                <div className={styles.authorBtns}>
                    <Button onClick={destroyPost}>Удалить</Button>
                    <Button onClick={() => openForm('updateType')}>Редактировать</Button>
                </div>}
            </div>
        </div>
    )
}
