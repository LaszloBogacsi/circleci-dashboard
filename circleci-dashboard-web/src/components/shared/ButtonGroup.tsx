import React, {ReactNode} from "react";
import styles from "./style.module.css";

interface ButtonGroupProps {
    children: ReactNode
}

export default (props: ButtonGroupProps) => {
    return (
        <div className={styles.buttonGroup}>
            {props.children}
        </div>
    )
}
