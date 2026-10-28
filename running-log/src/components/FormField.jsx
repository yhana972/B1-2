// value와 onChange를 부모에게 받아 controlled input을 구성합니다. 입력 state는 부모 폼에 있습니다.
// label의 htmlFor와 input의 id를 연결하고, name은 부모가 변경할 필드를 식별할 때 사용합니다.
// step은 number input의 입력 간격입니다. 거리에서 0.01을 전달해 소수점 입력을 허용합니다.
function FormField({label, type, name, value, onChange, error, step}){
    return(
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                step={step}
                id={name}
                name={name}
                value={value}
                onChange={onChange}/>
            {/* 해당 필드의 오류가 있을 때만 입력 근처에 표시합니다. */}
            {error && (
                <p className="error">{error}</p>
            )}
        </div>
    )
}
export default FormField;
