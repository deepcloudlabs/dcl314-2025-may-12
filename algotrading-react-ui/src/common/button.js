import React from "react";

export default function Button({click,label,color}) {
    return (
        <button className={"btn ".concat(color)}
                onClick={click}>{label}</button>
    );
}