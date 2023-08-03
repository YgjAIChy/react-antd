import React, {useState, useEffect, useRef, useContext,} from "react";

import UseMousePosition from "../../hooks/useMousePosition";

import { ThemesContext } from "../../App";

const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0);
    const likeRef = useRef(0)
    const didUpdate = useRef(false)
    const [buttonNumber, setButtonNumber] = useState({ num: 0 , disabled: true} )
    const [positions, setPositions] = useState({x: 0 , y: 0})

    const usePositions = UseMousePosition()

    // const themes = useContext(ThemesContext)

    const { theme, setTheme } = useContext(ThemesContext);

    const butStyle = {
        color: theme.color,
        background: theme.background
    }

    const lickClick = () => {
        setLike(like + 1)
        likeRef.current ++
    }
    const buttonClick = () => {
        setButtonNumber({
            num: 0 ,
            disabled: !buttonNumber.disabled
        })
    }

    const alertClick = () =>{
        setTimeout(()=>{
            alert(like + '+' + likeRef.current )
        },3000)
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

    useEffect(()=>{
        if (didUpdate.current) {
            // console.log("this is update")
        } else {
            didUpdate.current = true
        }
    })




    return (
        <div>
            <button style={butStyle} disabled={buttonNumber.disabled} onClick={lickClick}>
                { like }
            </button>

            <hr />

            <button style={butStyle} onClick={alertClick}>alert</button>

            <br/>
            <button style={butStyle} onClick={buttonClick}>
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
