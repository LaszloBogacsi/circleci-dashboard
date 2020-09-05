import React from "react";
import {SelectedProject} from "domain/SelectedProject";
import removeIcon from "img/delete.svg";
import styles from "./style.module.css";

interface SelectedProjectsListProps {
    data: SelectedProject[]
    remove: (item: SelectedProject) => void
}

export default (props: SelectedProjectsListProps) => {
    const {data, remove} = props;
    return (
        <div className={styles.selectedProjectList}>
            <table>
                <thead>
                <tr>
                    <th>PROJECT</th>
                    <th>BRANCH</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.branch}</td>
                            <td>
                                <div className={styles.cellAction} onClick={() => remove(item)}>
                                    <object data={removeIcon} type="image/svg+xml" className="svg">icon</object>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};