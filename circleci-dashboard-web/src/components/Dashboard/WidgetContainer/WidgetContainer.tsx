import React from "react";
import {Widget} from "components/Dashboard/Widget/Widget";
import {WidgetData} from "domain/WidgetData";
import styles from "./style.module.css";

interface WidgetContainerProps {
    widgetData: WidgetData[]
}

export default (props: WidgetContainerProps) => {
    return (
        <div className={styles.flexContainer}>
            {props.widgetData.map((data, index) => <Widget key={index} data={data}/>)}
        </div>
    );
};
