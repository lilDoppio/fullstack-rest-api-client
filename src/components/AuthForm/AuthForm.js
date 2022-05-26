import React, { useContext, useState } from 'react'
import styles from './AuthForm.module.css'
import { login, registration } from '../../http/userAPI'
import {Context} from '../../index'
import { Button } from '../UI/Button/Button'

export const AuthForm = ({isAuth, setIsAuth}) => {
    const [isLogin, setIsLogin] = useState(true)
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState('')

    const click = async (e) => {
        e.preventDefault()
        try {
          let data
          if (isLogin) {
            data = await login(email, password, userName)
          } else {
            data = await registration(email, password, userName)
          }
          user.setUser(data)
          setIsAuth(false)
        } catch (e) {
          setError(e.response.data.message)
        }
      }

    return (
        <div 
            className={isAuth ? [styles.modalActive, styles.modal].join(' ') : styles.modal}
        >
            <div 
                className={styles.content}
                onClick={e => e.stopPropagation()}
            >
                {isLogin ?
                <>
                  <form className={styles.form}>
                      <input 
                        type="text" 
                        placeholder='Введите почту' 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}

                      />
                      <input 
                        type="text" 
                        placeholder='Введите имя' 
                        onChange={e => setUserName(e.target.value)} 
                        value={userName}

                      />
                      <input 
                        type="text" 
                        placeholder='Введите пароль' 
                        onChange={e => setPassword(e.target.value)} 
                        value={password}

                      />
                      <Button onClick={e => click(e)}>Войти</Button>
                  </form>
                  <Button onClick={() => setIsLogin(false)}>Еще не зарегистророванны?</Button>
                </>
                :
                <>
                  <form className={styles.form}>
                      <input 
                        type="text" 
                        placeholder='Введите почту' 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}

                      />
                      <input 
                        type="text" 
                        placeholder='Введите имя' 
                        onChange={e => setUserName(e.target.value)} 
                        value={userName}

                      />
                      <input 
                        type="text" 
                        placeholder='Введите пароль' 
                        onChange={e => setPassword(e.target.value)} 
                        value={password}

                      />
                      <Button onClick={e => click(e)}>Зарегистрироваться</Button>
                  </form>
                  <Button onClick={() => setIsLogin(true)}>Уже зарегистророванны?</Button>
                </>}
                {error && <h5 style={{color: 'red', textAlign: 'center', marginTop: 25}}>{error}</h5>}
            </div>
        </div>
    )
}
