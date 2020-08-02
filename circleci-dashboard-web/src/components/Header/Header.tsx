import styles from "./style.module.css";
import React from "react";
import OrgSelector from "components/Header/OrgSelector/OrgSelector";
import Account from "components/Header/Account/Account"
import {User} from "domain/User";
import {Collaboration} from "domain/Collaboration";

interface HeaderProps {
    user: User
    options: Collaboration[]
    selectedOrg: Collaboration
    setSelectedOrg: (selectedOrg: Collaboration) => void
    logout: () => void
}

export default (props: HeaderProps) => {
    const {user, options, setSelectedOrg, selectedOrg, logout} = props;
    const headerText = "CIRCLECI BUILD DASHBOARD"
    return (
        <div>
            <header className={styles.appHeader}>{headerText}</header>
            <div className={styles.inputSelectors}>
                <OrgSelector options={options} setSelectedOrg={setSelectedOrg} selectedOrg={selectedOrg}/>
                <Account user={user} logOutHandler={logout}/>
            </div>
        </div>
    );
}
