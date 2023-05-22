import React from 'react'

interface MyComponentProps {
    message?: string;
}

const Hello: React.FC<MyComponentProps> = (props) => {
    return (
        <div>
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
