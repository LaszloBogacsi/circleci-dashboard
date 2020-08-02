import React, {MouseEvent} from "react";

interface ButtonProps {
    className: string
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    buttonText: string
}

export default (props: ButtonProps) => {
    const {className, onClick, buttonText} = props;
    return (
        <button className={className} onClick={onClick}>{buttonText}</button>

    )
}