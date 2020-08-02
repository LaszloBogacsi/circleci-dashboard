import React from "react";
import styles from "./style.module.css";
import Modal from "components/shared/Modal";

interface UserInfoModalProps {
    logoutHandler: () => void
}

export default (props: UserInfoModalProps) => {
    const {logoutHandler} = props;
    return (
        <Modal>
            <div className={styles.userInfoModal}>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </Modal>
    )
}
