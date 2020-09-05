import React, {ChangeEvent, useEffect, useState} from "react";
import {FollowedProjects} from "domain/FollowedProjects";
import {SelectedProject} from "domain/SelectedProject";
import Select from "components/shared/Select";
import addIcon from "img/plus.svg";
import styles from "./style.module.css";

interface ProjectSelectorProps {
    data: FollowedProjects[]
    add: (selected: SelectedProject) => void;
}

export default (props: ProjectSelectorProps) => {
    const {data, add} = props;
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    useEffect(() => {
        if (data.length) {
            setSelectedProject(data[0].projectName);
            setSelectedBranch(data[0].branches[0]);
        }
    }, [data])

    return (
        <div className={styles.projectSelector}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div>
                            <Select value={selectedProject} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedProject(event.target.value)}>
                                {data.map((option, index) => <option key={index} value={option.projectName}>{option.projectName}</option>)}
                            </Select>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Select value={selectedBranch} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedBranch(event.target.value)}>
                                {data.find(d => d.projectName === selectedProject) ? data.find(d => d.projectName === selectedProject)!.branches.map((option, index) =>
                                    <option key={index} value={option}>{option}</option>) : []}
                            </Select>
                        </div>
                    </td>
                    <td>
                        <div className={styles.cellAction} onClick={() => add({name: selectedProject, branch: selectedBranch})}>
                            <object data={addIcon} type="image/svg+xml" className="svg">icon</object>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
