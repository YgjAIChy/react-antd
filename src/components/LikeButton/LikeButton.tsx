import React, { useState } from "react";

const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0);
    const [buttonNumber, setButtonNumber] = useState({ num: 0 , disabled: true} )
    const lickClick = () => {
        setLike(like + 1)
    }
    const buttonClick = () => {
        setButtonNumber({
            num: 0 ,
            disabled: !buttonNumber.disabled
        })
    }
    return (
        <div>
            <button disabled={buttonNumber.disabled} onClick={lickClick}>
                { like }
            </button>
            <br/>
            <button onClick={buttonClick}>
                { buttonNumber.disabled ? 'ON' : 'OFF' }
            </button>
        </div>
    )
}

export default LikeButton
