import React, {useState} from "react";
import styles from "./style.module.css";
import settings from "img/settings.svg";
import IntervalModal from "components/Dashboard/IntervalModal/IntervalModal";

interface LastUpdatedProps {
    lastUpdated: string
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
}

export default (props: LastUpdatedProps) => {
    const {lastUpdated, refreshInterval, setRefreshInterval} = props;
    const [toggle, setToggle] = useState(false);
    const toggleDropDown = () => {
        setToggle(!toggle)
    }
    const close = () => setToggle(false);
    return (
        <div className={styles.lastRefreshed}>
            <div>
                <div title="Change Interval" onClick={toggleDropDown}>
                    <object data={settings} type="image/svg+xml" className="svg">icon</object>
                </div>
                Last Updated:
            </div>
            <div>{lastUpdated}</div>
            {toggle ? <IntervalModal refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval} close={close}/> : null}
        </div>
    )
}
