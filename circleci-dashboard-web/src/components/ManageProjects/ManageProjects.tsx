import React from "react";
import {Link} from "react-router-dom";
import {useFollowedProjects} from "components/ManageProjects/hooks";
import SelectedProjectsList from "components/ManageProjects/SelectedProjectsList/SelectedProjectsList";
import ProjectSelector from "components/ManageProjects/ProjectSelector/ProjectSelector";
import {SelectedProject} from "domain/SelectedProject";
import {Collaboration} from "domain/Collaboration";
import {FollowedProjects} from "domain/FollowedProjects";
import {FollowedProjectsData} from "domain/FollowedProjectsData";
import back from "img/left.svg";
import styles from "./style.module.css";

interface ManageProjectsProps {
    selectedOrg: Collaboration
    selectedProjects: SelectedProject[]
    setSelectedProjects: (projects: SelectedProject[]) => void
    inMockMode: boolean
}

export default(props: ManageProjectsProps) => {
    const {selectedOrg, selectedProjects, setSelectedProjects, inMockMode} = props;

    const projects = useFollowedProjects(inMockMode);
    const processFollowedProjectsData = (followedProjectsData: FollowedProjectsData[]): FollowedProjects[] => {
        return followedProjectsData.filter(followedProject => followedProject.username === selectedOrg.name).map(project => ({
            branches: Object.keys(project.branches),
            projectName: project.reponame,
        }));
    }

    function addSelectedProject(project: SelectedProject) {
        setSelectedProjects([...selectedProjects.filter(selected => selected.name !== project.name || selected.branch !== project.branch), project])
    }

    const removeASelectedProject = (item: SelectedProject) => setSelectedProjects(selectedProjects.filter(project => project !== item))

    return (
        <div>
            <div className={styles.addProjectsHeader}>
                <h1>Manage Projects</h1>
                <Link to="/" title={"Back"}>
                    <object data={back} type="image/svg+xml" className="svg">icon</object>
                </Link>
            </div>
            <SelectedProjectsList data={selectedProjects} remove={removeASelectedProject}/>
            <ProjectSelector data={processFollowedProjectsData(projects)} add={addSelectedProject}/>
        </div>
    );
};