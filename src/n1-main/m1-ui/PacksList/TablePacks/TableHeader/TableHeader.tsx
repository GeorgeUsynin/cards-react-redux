import React from "react";
import cls from "./TableHeader.module.scss"

type TableHeaderType = {
    className: string
}

export const TableHeader: React.FC<TableHeaderType> = ({className}) => {

    return (
        <div className={`${className} ${cls.tableHeader}`}>
            <div>Name</div>
            <div>Cards</div>
            <div>Last Updated</div>
            <div>Created</div>
            <div>Actions</div>
        </div>
    )
}