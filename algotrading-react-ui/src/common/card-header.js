import React from "react";

export default function CardHeader({title,children}) {
    return (
        <div className="card-header">
            <h3 className="card-title">{title}</h3>
            {children}
        </div>
    );
}