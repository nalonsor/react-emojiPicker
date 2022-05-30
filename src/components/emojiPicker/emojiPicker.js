/**
 * 
 *  FORMA ESPECIAL DE COMPONENTE
 *  sirve para pasar la referencia de un conponente padre 
 *  a un componente hijo
 * 
 */
import React from 'react';
import { forwardRef, useRef, useEffect, useState } from 'react'

import styles from './emojiPicker.module.scss';

import { data as emojiList } from './data'
import EmojiBoton from './emojiBoton'
import EmojiSearch from './emojiSerch'

export function EmojiPicker(props, inputRef){

    const [isOpen, setIsOpen] = useState(false)
    const [emojis, setEmojis] = useState(emojiList)

    const containerRef = useRef(null)

    useEffect(() => {
        window.addEventListener('click', e => {
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false)
                setEmojis(emojiList)
            }
        })
    },[])

    /*function EmojiPickerContainer(){ 
        return 
    }*/

    function handleClick(e) {
        setIsOpen(!isOpen)
    }

    function handleSearch(e){
        const q = e.target.value.toLowerCase()
        
        if(!!q){
            
            //console.log(q)
            const search = emojiList.filter(e => {
                return(
                    e.name.toLowerCase().includes(q) ||
                    e.keywords.toLocaleLowerCase().includes(q)
                )
            }) 

            setEmojis(search)
        }else{
            setEmojis(emojiList)
        }
    }

    function handleClickEmoji(emoji){
        const cursorPos = inputRef.current.selectionStart
        const text = inputRef.current.value
        const prev = text.slice(0,cursorPos)
        const next = text.slice(cursorPos)

        inputRef.current.value = prev + emoji.symbol + next
        inputRef.current.selectionStart = cursorPos + emoji.symbol.length
        inputRef.current.selectionEnd = cursorPos + emoji.symbol.length
        inputRef.current.focus()

    }

    return <div ref={ containerRef } className={styles.inputContainer}>
        <button onClick={handleClick} className={styles.emojiPickerButton}>😊</button>

        { isOpen && <div className={styles.emojiPickerContainer}>
            <EmojiSearch 
                onSearch={handleSearch}
            />
            <div className={styles.emojiList}>
                {
                    emojis.map(e => 
                                <EmojiBoton 
                                    key={e.symbol}
                                    emoji={e}
                                    onClick={handleClickEmoji}
                                />
                            )
                }
            </div>
        </div> }
    </div>
}

export default forwardRef(EmojiPicker)