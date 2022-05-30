import React from 'react';
import styles from './emojiPicker.module.scss';

export default function EmojiSearch({ onSearch }){
    return <input onChange={onSearch} placeholder="Search emoji" className={styles.search} />
}