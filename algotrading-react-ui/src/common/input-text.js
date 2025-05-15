import React from "react";

export default function InputText({id, label,placeholderText, value, handleChange}) {
    return (
        <>
            <label htmlFor={id} className={"form-label"}>{label}:</label>
            <input className={"form-control"}
                   type={"text"}
                   name={id}
                   id={id}
                   placeholder={placeholderText}
                   value={value}
                   onChange={handleChange}
            />
        </>
    );
}