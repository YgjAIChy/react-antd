import React, {useContext} from 'react'
import { ThemesContext } from "../App";


interface MyComponentProps {
    message?: string;
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

const Hello: React.FC<MyComponentProps> = (props) => {
    const { theme, setTheme } = useContext(ThemesContext);


    const butStyle = {
        color: theme.color,
        background: theme.background
    }

    const changeColor = () => {
        setTheme(theme === myTheme.light ? myTheme.dark : myTheme.light);
    }

    return (
        <div style={butStyle}>
            Hello
            <button onClick={changeColor}>changeColor</button>
            <span>
                { props.message }
            </span>
        </div>
    )
}

Hello.defaultProps = {
    message: 'Hello word'
}

export default Hello
