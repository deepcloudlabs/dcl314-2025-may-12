import React from "react";

export default function TableHead({columns,children}) {
    return (
        <thead>
        <tr>
            {columns.map((column, index) => (<th key={column}>{column}</th>))}
            {children}
        </tr>
        </thead>
    );
}