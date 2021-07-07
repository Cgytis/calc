
const options = ({ value, onChange }) => {
    return (
        <section className='form-group'>
            <label>Pasirinkite PVM dalį</label>
            <select value={value} onChange={onChange}>
                <option value="21">21%</option>
                <option value="9">9%</option>
                <option value="5">5%</option>
            </select>

        </section>
    )
}

export default options
