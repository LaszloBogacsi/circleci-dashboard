import {User} from "domain/User";
import styles from "./style.module.css";
import downChevron from "img/down-chevron.png";
import React from "react";

interface UserInfoProps {
    isOpen: boolean
    user: User
    toggleOpen: () => void
}

export default (props: UserInfoProps) => {
    const {user, toggleOpen, isOpen} = props;
    return (
        <div className={styles.userInfo} onClick={toggleOpen}>
            <div>{user.name}</div>
            <div>
                <img className={isOpen ? styles.flip : ""} src={downChevron} alt="down"/>
            </div>
        </div>
    );
};