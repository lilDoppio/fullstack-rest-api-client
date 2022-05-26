import React, { useContext, useState } from 'react'
import styles from './PostForm.module.css'
import { Context } from '../../index';
import { createPost, upersetPost } from '../../http/itemAPI';

export const PostForm = ({isPostForm, setIsPostForm, formType, post}) => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('defaultImageState')
    const [error, setError] = useState('')

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const click = async (e) => {
        try {
            e.preventDefault()
            const newDate = new Date()
            const currentDate = `${newDate.getDate()}.${newDate.getMonth()<10?0:''}${newDate.getMonth() + 1}.${newDate.getFullYear()}`
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('userName', user.user.userName)
            formData.append('userId', user.user.id)
            formData.append('date', currentDate)
            formData.append('image', file)
            if (formType === 'createType') {
                createPost(formData)
                    .then(res => setIsPostForm(false))
                    .then(res => user.setRefresh(!user.refresh))
            }
            if (formType === 'updateType') {
                formData.append('id', post.id)
                upersetPost(formData)
                    .then(res => setIsPostForm(false))
                    .then(res => user.setRefresh(!user.refresh))
            }
            setTitle('')
            setContent('')
            setFile(null)
        } catch (e) {
            setError(e.response.data.message)
        }
      }

    return (
        <div 
            className={isPostForm ? [styles.modalActive, styles.modal].join(' ') : styles.modal}
            onClick={() => setIsPostForm(false)}
        >
            <div 
                className={styles.content}
                onClick={e => e.stopPropagation()}
            >
                <form className={styles.form}>
                    <input 
                        type="text" 
                        placeholder='Введите название'
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea 
                        type="text" 
                        placeholder='Введите описание'
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />
                    <input 
                        type="file" 
                        onChange={selectFile}
                    />
                    <button onClick={click}>Создать</button>
                </form>
                {error && <h5 style={{color: 'red', textAlign: 'center', marginTop: 25}}>{error}</h5>}
            </div>
        </div>
    )
}