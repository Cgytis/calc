
const input = ({ name, value, onChange }) => {
    return (
        <section className='input'>
            <form className='form-group'>
                <label>{name}</label>
                <input type="text" autoFocus={name === 'Suma su PVM'} value={value} onChange={onChange} />
            </form>
        </section>
    )
}

export default input
