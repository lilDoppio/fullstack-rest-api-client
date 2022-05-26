import React from 'react'
import styles from './Input.module.css'

export const Input = ({placeholder}) => {
    return (
        <input 
            className={styles.input}
            placeholder={placeholder}
        >

        </input>
    )
}
