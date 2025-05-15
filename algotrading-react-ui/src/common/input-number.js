import React from "react";

export default function InputNumber({id,min, max, label,placeholderText, value, handleChange}) {
    return (
        <>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <input className={"form-control"} type={"number"}
                   name={id}
                   id={id}
                   min={min}
                   max={max}
                   placeholder={placeholderText}
                   value={value}
                   onChange={handleChange}
            />
        </>
    );
}