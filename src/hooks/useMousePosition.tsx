import React , { useState, useEffect } from "react";


const UseMousePosition = () => {
    const [positions, setPositions] = useState({x: 0 , y: 0})

    useEffect(()=>{
        console.log('add mousemove',positions.x)
        const updateMouse = (e: MouseEvent) => {
            // console.log('set mousemove')
            setPositions({x: e.clientX,y: e.clientY})
        }
        document.addEventListener('mousemove',updateMouse)
        //  清除
        return () =>{
            console.log('remove mousemove',positions.x)
            document.removeEventListener('mousemove',updateMouse)
        }
    },[])
    return positions
}

export default UseMousePosition
