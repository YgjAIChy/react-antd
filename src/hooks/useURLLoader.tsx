import { useState, useEffect } from "react";
import axios from "axios";

const UseURLLoader = (url: string, deps: any[] = []) => {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(url).then((res)=>{
            setData(res.data)
        }).finally(()=>{
            setLoading(false)
        })

    },deps)

    return [data, loading]

}

export default UseURLLoader