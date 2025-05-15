export default function SelectBox({id, value,handleChange,options, label}){
    return (
        <div className="form-floating">
            <select className={"form-select"}
                    id={id}
                    name={id}
                    value={value}
                    onChange={handleChange}>
                {
                    options.map((opt) => (
                        <option value={opt} key={opt}>{opt}</option>
                    ))
                }
            </select>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}