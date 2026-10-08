function FormField({label, type, name, value, onChange, error}){
    return(
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}/>
            {error && (
                <p className="error">{error}</p>
            )}
        </div>
    )
}
export default FormField;