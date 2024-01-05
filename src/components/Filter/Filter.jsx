import css from './Filter.module.css'


const Filter = ({ filterContact }) => {
    const handleChange = ({ target: { value } }) => {
        filterContact(value)
    }

    return (
        <div className={css.wrapper}>
            <p className={css.text}>Find contact by name:</p>
            <input type="text" name="filter" className={css.input} onChange={handleChange} />
        </div>
    )
}


export default Filter