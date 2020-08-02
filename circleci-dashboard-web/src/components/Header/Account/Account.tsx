import React, {useState} from "react";
import styles from "./style.module.css";
import {User} from "domain/User";
import UserInfo from "components/Header/UserInfo/UserInfo";
import UserInfoModal from "components/Header/UserInfoModal/UserInfoModal";

interface AccountProps {
    user: User
    logOutHandler: () => void
}

export default (props: AccountProps) => {
    const {user, logOutHandler} = props;
    const [toggle, setToggle] = useState(false);

    const toggleDropDown = () => {
        setToggle(!toggle)
    }
    const logoutAndCloseModal = () => {
        setToggle(false);
        logOutHandler();
    }

    return (
        <div className={styles.account}>
            <UserInfo toggleOpen={toggleDropDown} user={user} isOpen={toggle}/>
            {toggle ? <UserInfoModal logoutHandler={logoutAndCloseModal}/> : null}
        </div>
    );
};
