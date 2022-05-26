import {useContext, useEffect, useState} from 'react'
import { Context } from '.';
import './App.css';
import { AuthForm } from './components/AuthForm/AuthForm'
import { Post } from './components/Post/Post';
import { PostForm } from './components/PostForm/PostForm'
import { Button } from './components/UI/Button/Button';
import { fetchPosts } from './http/itemAPI';
import { use } from "bcrypt/promises";
import { observer } from "mobx-react-lite";
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context)
  const [isAuth, setIsAuth] = useState(true)
  const [isPostForm, setIsPostForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [formType, setFormType] = useState('')

  useEffect(() => {
    fetchPosts().then(data => user.setPosts(data.reverse()))
    check().then(data => {
      use.setUser(true)
      use.setAuth(true)
    }).finally(() => setLoading(false))
  }, [user.refresh])

  const openForm = (formType) => {
    setFormType(formType)
    setIsPostForm(true)
  }

  if (loading) {
    return <h1 className='loading'>LOADING...</h1>
  }

  return (
    <div className="App">
      <AuthForm
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <PostForm
        isPostForm={isPostForm}
        setIsPostForm={setIsPostForm}
        formType={formType}
      />
      {user.user && <div className='user'>
        <h3>ID: {user.user.id}</h3>
        <h3>Name: {user.user.email}</h3>
        <h3>Email: {user.user.userName}</h3>
      </div>}
      <Button onClick={() => openForm('createType')}>
        Создать пост
      </Button>
      {user.posts.map(post => {
        return <Post post={post}/>
      })}
    </div>
  );
})

export default App;
