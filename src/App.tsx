import React, {useState, Suspense ,createContext , useTransition} from 'react';
import './App.css';
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton/LikeButton";
import UseMousePosition from "./hooks/useMousePosition";
import withLoader from "./components/withLoader/withLoader";

import UseURLLoader from "./hooks/useURLLoader";

import DogShowModal from "./components/dogShow/DogShow";
import Todo from "./components/dogShow/Todo";

interface IsShowResult {
  message: string;
  status: string
}

interface IThemeProps {
  [key: string] : { color: string, background: string}
}

const myTheme: IThemeProps = {
  'light': {
    color: 'red',
    background: 'blue'
  },
  'dark': {
    color: 'pink',
    background: 'yellow'
  }
}

// 定义主题类型
interface ITheme {
  color: string;
  background: string;
}

// 定义设置主题的函数类型
type SetTheme = React.Dispatch<React.SetStateAction<ITheme>>;


// 创建一个主题上下文并传入默认值
export const ThemesContext = createContext<{ theme: ITheme; setTheme: SetTheme }>({
  theme: myTheme.light,
  setTheme: () => {} // 在提供者外部使用一个空函数作为默认值
});

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

  const [theme, setTheme] = useState(myTheme.light);

  const [inputVal, setInputVal] = useState('')
  const [searchData,setSearchData] = useState<number[]>([])

  const usePositions = UseMousePosition()

  const [inPending,startTransition ] = useTransition()

  const [data, loading] =UseURLLoader('https://dog.ceo/api/breeds/image/random')

  const dogResult = data as IsShowResult

  const messageChange = () => {
    setMessage(message + "!")
  }
  const showChange = () => {
    setShow(!show)
  }

  // 设置主题的实际函数
  const updateTheme: SetTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputVal(value)

    // 非紧急更新
    startTransition(()=>{
      const  arr = Array.from({ length: 10000}, (v,i) => {return new Date().getTime() + i })

      setSearchData(arr)
    })


  }



  return (
    <div className="App">
      <ThemesContext.Provider value={{ theme, setTheme:updateTheme }}>

        <input type={"text"} onChange={inputChange}/>
        {
          inPending && <h1>等待中</h1>
        }

        {
          searchData.map((item)=>(
              <div>
                <option key={item}>{item}</option>
              </div>
          ))
        }

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
            loading ? <p>加载中</p> : <img src={dogResult && dogResult.message} />
          }
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
      </ThemesContext.Provider>
    </div>
  );
}

export default App;
