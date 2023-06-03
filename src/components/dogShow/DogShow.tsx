import React from "react";
import fetchData from "../fetchData/fetchData";

const data = fetchData('https://dog.ceo/api/breeds/image/random')

const DogShowModal: React.FC = () => {
    const dogData = data.read();
    return (
        <img src={dogData.message} alt="DogShow" />
    )
}

export default DogShowModal