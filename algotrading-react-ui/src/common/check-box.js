export default function CheckBox({id, value,handleChange, label}){
    return (
        <div className="form-check">
            <label htmlFor={id}>{label}
                <input type={"checkbox"}
                       className={"form-check-input"}
                        id={id}
                        name={id}
                        checked={value}
                        onChange={handleChange}>
                </input>
            </label>
        </div>
    )
}