import axios from "axios";

function wrapPromise(promise: Promise<any>) {
    let status = 'pending';
    let result: any;
    let suspender = promise.then((res)=>{
        status = 'success';
        result = res;
    },(err)=>{
        status = 'error';
        result = err;
    })
    return {
        read() {
            if (status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            } else if (status === 'success') {
                return result
            }
        }
    }
}

export default function fetchData(url: string) {
    const promise = axios.get(url).then((rawData)=> rawData.data)
    return wrapPromise(promise)
}