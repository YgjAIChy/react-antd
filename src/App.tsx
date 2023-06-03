import React, {useState, Suspense} from 'react';
import './App.css';
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton/LikeButton";
import UseMousePosition from "./hooks/useMousePosition";
import withLoader from "./components/withLoader/withLoader";

import DogShowModal from "./components/dogShow/DogShow";
import Todo from "./components/dogShow/Todo";

interface IsShowResult {
  message: string;
  status: string
}

const DogShow: React.FC<{ data: IsShowResult}> = ({ data }) => {
  return (
      <>
        <h2>Dog Show: {data.status}</h2>
        <img src={data.message} alt="image"/>
      </>
  )
}

const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')

function App() {
  const [message, setMessage] = useState('Hello word!!!')
  const [show,setShow] = useState(true)

  const usePositions = UseMousePosition()

  const messageChange = () => {
    setMessage(message + "!")
  }
  const showChange = () => {
    setShow(!show)
  }
    return (
    <div className="App">

      <Suspense fallback={<h2>loading....</h2>}>
        <DogShowModal />
      </Suspense>

      <Suspense fallback={<h2>loading....</h2>}>
        <Todo />
      </Suspense>
      <header className="App-header">
        <button onClick={showChange}>showChange</button>
        <p onClick={messageChange}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <WrappedDogShow />
          <Hello message={message} />
        {
          show && <LikeButton/>
        }
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          MouseMove
        </div>
        <p>X: {usePositions.x} Y: {usePositions.y}</p>
      </header>
    </div>
  );
}

export default App;
