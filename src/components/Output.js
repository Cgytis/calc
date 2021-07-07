
const output = ({ withPVM, withoutPVM, PVM }) => {
    return (
        <div className='output'>
            <p>Suma su PVM:&nbsp;</p>
            <div className="output-div"><span className="with-pvm-output">{withPVM}</span></div>
            <p>Suma be PVM:&nbsp; </p>
            <div className="output-div"><span className="without-pvm-output">{withoutPVM}</span></div>
            <p>PVM:&nbsp;</p>
            <div className="output-div"><span className="pvm-output">{PVM}</span></div>
        </div>
    )
}

export default output
