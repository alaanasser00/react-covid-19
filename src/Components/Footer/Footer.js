import React from 'react'
import styles from './Footer.module.css'

// [BEGIN] FontAwesome Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>
                Made with <FontAwesomeIcon icon={faHeart} /> by <a target="_blank" href="https://www.linkedin.com/in/alaanasser00/">Alaa Nasser</a>
            </p>
        </div>
    )
}

export default Footer
