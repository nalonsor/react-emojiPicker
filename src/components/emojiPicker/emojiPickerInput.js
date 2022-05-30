import React from 'react'
import { useRef } from 'react'
import EmojiPicker from "./emojiPicker"

export default function EmijiPickerInput(){

    const refInput = useRef(null)

    return <div>
        <input type="text" ref={ refInput } />
        <EmojiPicker ref={ refInput } />
    </div>
}