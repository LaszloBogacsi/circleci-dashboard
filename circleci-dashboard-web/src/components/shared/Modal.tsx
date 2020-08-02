import React, {ReactNode} from "react";
import styles from "./style.module.css";

interface ModalProps {
    children: ReactNode
}

export default (props: ModalProps) => {
    return (
        <div className={styles.modal}>
            {props.children}
        </div>
    )
}
