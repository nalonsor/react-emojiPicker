import React from "react"
import styles from './emojiPicker.module.scss';

export default function EmojiBoton({ emoji, onClick }) {

    function handleClick(e){
        onClick(emoji)
    }

    return <button onClick={handleClick} className={styles.emojiButton}>{emoji.symbol}</button>
}