import React, {ChangeEvent, ReactElement} from "react";

interface SelectProps {
    value: string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    children: ReactElement[]
}

export default (props: SelectProps) => {
    const {value, onChange} = props;
    return (
        <select value={value} onChange={onChange}>
            {props.children}
        </select>
    )
}
