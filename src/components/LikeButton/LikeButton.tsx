import React, { useState, useEffect } from "react";

import UseMousePosition from "../../hooks/useMousePosition";

const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0);
    const [buttonNumber, setButtonNumber] = useState({ num: 0 , disabled: true} )
    const [positions, setPositions] = useState({x: 0 , y: 0})

    const usePositions = UseMousePosition()

    const lickClick = () => {
        setLike(like + 1)
    }
    const buttonClick = () => {
        setButtonNumber({
            num: 0 ,
            disabled: !buttonNumber.disabled
        })
    }
    useEffect(() =>{
        document.title = `你点击了${like}次`
    })

    useEffect(()=>{
        console.log('add',positions.x)
        const updateMouse = (e: MouseEvent) => {
            console.log('set')
            setPositions({x: e.clientX,y: e.clientY})
        }
        document.addEventListener('click',updateMouse)
    //  清除
        return () =>{
            console.log('remove',positions.x)
            document.removeEventListener('click',updateMouse)
        }
    },[])




    return (
        <div>
            <button disabled={buttonNumber.disabled} onClick={lickClick}>
                { like }
            </button>
            <br/>
            <button onClick={buttonClick}>
                { buttonNumber.disabled ? 'ON' : 'OFF' }
            </button>
            <div>
                Click
            </div>
            <p>X: {positions.x} Y: {positions.y}</p>

            <div>
                MouseMove
            </div>
            <p>X: {usePositions.x} Y: {usePositions.y}</p>
        </div>
    )
}

export default LikeButton
