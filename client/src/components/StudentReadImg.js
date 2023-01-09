import React from 'react'
import styles from './StudentReadImg.module.css'
import studentReadImg from '../img/student-reading.svg'

const StudentReadImg = () => {
  return (
    <div>
       
        <img src={studentReadImg} alt='student reading' className={styles['img__student-read']} />

    </div>
  )
}

export default StudentReadImg