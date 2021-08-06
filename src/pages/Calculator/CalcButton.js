import './style.css'

const CalcButton = ({ children, color, onClick }) => {
    return (
        <div>
            <button
                style={color === 'black'
                    ? { background: 'black' }
                    : color === 'grey'
                        ? { background: '#2D2D2D' }
                        : color === 'blue'
                            ? { background: '#39275D' }
                            : {}
                }
                onClick={onClick}>
                {children}
            </button>
        </div>
    )
}

export default CalcButton
