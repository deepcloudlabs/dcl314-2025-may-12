import React from "react";

export default function Table({children}) {
    return (
        <table className="table table-striped table-bordered table-hover table-responsive">
            {children}
        </table>
    );
}