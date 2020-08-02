import React, {ChangeEvent, ReactElement} from "react";
import styles from "./style.module.css";
import {saveToLocalStorage} from "utils/localStorage";
import Select from "components/shared/Select";
import {Collaboration} from "domain/Collaboration";

interface OrgSelectorProps {
    options: Collaboration[]
    setSelectedOrg: (collaboration: Collaboration) => void
    selectedOrg: Collaboration
}

export default (props: OrgSelectorProps): ReactElement => {
    const {options, setSelectedOrg, selectedOrg} = props;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let collaboration = options.find(option => option.name === event.target.value)!;
        setSelectedOrg(collaboration);
        saveSelectedOrgToLocalStorage(collaboration);
    }
    return (
        <div>
            <label htmlFor="select">ORG</label>
            <div className={styles.orgSelector}>
                <Select
                    value={selectedOrg.name}
                    onChange={handleChange}>
                    {options.map((option, index) => <option key={index} value={option.name}>{option.name}</option>)}
                </Select>
                <img src={selectedOrg.avatar_url} alt="org-avatar"/>
            </div>

        </div>

    )
}

function saveSelectedOrgToLocalStorage(selectedOrg: Collaboration): void {
    const localStorageKey = "circleci-dashboard-collab-storage";
    saveToLocalStorage(localStorageKey, JSON.stringify(selectedOrg));
}
