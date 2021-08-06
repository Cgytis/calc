
const Output = ({ foolOutput, tempOutput }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <div style={foolOutput.length < 12
                ? { fontSize: '25px', margin: '0 10px 15px', color: 'rgb(51, 51, 51)', maxWidth: '315px' }
                : { margin: '0 10px 25px', fontSize: '23px', color: 'rgb(51, 51, 51)' }} >{foolOutput}</div>
            <div style={tempOutput.length < 12
                ? { fontSize: '50px', margin: '0 10px', color: 'white' }
                : tempOutput.length < 15
                    ? { fontSize: '40px', color: 'white' }
                    : tempOutput.length < 20
                        ? { fontSize: '30px', color: 'white' }
                        : tempOutput.length < 25
                            ? { fontSize: '24px', color: 'white' }
                            : { fontSize: '23px', color: 'white' }}>{tempOutput}</div>
        </div>
    )
}

export default Output
