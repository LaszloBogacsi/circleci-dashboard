import React, {ChangeEvent, ReactElement, ReactNode, useCallback, useEffect, useState} from 'react';
import './App.css';
import success from './img/success.svg'
import failed from './img/failed.svg'
import cancelled from './img/cancelled.svg'
import running from './img/running.svg'
import on_hold from './img/on_hold.svg'
import edit from './img/edit.svg'
import addIcon from './img/plus.svg'
import removeIcon from './img/delete.svg'
import back from './img/left.svg'
import settings from './img/settings.svg'

import styles from './widget.module.css';
import wcStyles from './widget-container.module.css';

import axios from 'axios';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import {getFollowedProjects, getJobsForWorkflow, getOptionsData, getPipelinesForProject, getWorkflowsForPipeline} from "./MockResponse";
import Header from "components/Header/Header";
import {saveToLocalStorage} from "utils/localStorage";
import Select from "components/shared/Select";
import Modal from "components/shared/Modal";
import {User} from "domain/User";
import {Collaboration} from "domain/Collaboration";
import Login from "components/Login/Login";

interface ApiData {
    project: string
    pipelines: Pipeline[]
    workflows: Workflow[]
    jobs: { workflowId: string, jobs: Job[] }[]
}

const inMockMode = false;

function useInterval(callback: (cancelledState: () => boolean) => void, delay: number, runImmediatley: boolean) {
    useEffect(() => {
        let cancelled = false;

        function func() {
            callback(() => cancelled);
        }

        const id = setInterval(func, delay);
        if (runImmediatley) func();

        return () => {
            cancelled = true;
            clearInterval(id);
        }
    }, [callback, delay, runImmediatley])
}

function useIntervalApiData(projects: SelectedProject[], interval: number, setLastRefreshed: (date: Date) => void) {
    const initialApiData: ApiData[] = [];

    async function getApiData(): Promise<ApiData[]> {

        if (inMockMode) {
            console.log("called");
            const pipelines = await getPipelinesForProject();
            const workflows = await getWorkflowsForPipeline();
            const jobs = await getJobsForWorkflow();
            return projects.map(project => project.name).map(project => ({
                project,
                pipelines: pipelines.items,
                workflows: workflows.items,
                jobs: [{workflowId: "ae768c71-303e-44e0-a223-5bc3d7a35354", jobs: jobs.items}]
            }));
        } else {
            return await get<ApiData[]>("http://localhost:4000/data", {projects: projects.map(project => `${project.name}|${project.branch}`).join(",")});
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    const loadApiData = useCallback(async isCancelled => {
        const apiData = await getApiData();
        if (isCancelled()) return;
        setApiData(apiData);
        setLastRefreshed(new Date());

    }, [])

    useInterval(loadApiData, interval, true);

    return apiData;
}

export interface FollowedProjectsData {
    branches: { [key: string]: any }
    oss: boolean
    reponame: string
    parallel: number
    username: string
    has_usable_key: boolean
    vcs_type: string
    language: string | null
    vcs_url: string
    following: boolean
    default_branch: string
}

interface FollowedProjects {
    branches: string[]
    projectName: string
}

function useFollowedProjects() {
    const initialApiData: FollowedProjectsData[] = [];

    async function getApiData(): Promise<FollowedProjectsData[]> {
        if (inMockMode) {
            return await getFollowedProjects();

        } else {
            return await get<FollowedProjectsData[]>("http://localhost:4000/projects");
        }
    }

    const [apiData, setApiData] = useState(initialApiData);
    useEffect(() => {
        const loadApiData = async () => {
            const apiData = await getApiData();
            setApiData(apiData);
        }
        loadApiData();
    }, [])

    return apiData;
}

async function get<T>(url: string, params: { [key: string]: string } = {}): Promise<T> {
    const result = await axios.get(url, {params, withCredentials: true});
    return result.data as T
}

async function post<T>(url: string, params: { [key: string]: string } = {}, body = {}): Promise<T> {
    const result = await axios.post(url, body, {params, withCredentials: true});
    return result.data as T
}

function App() {
    const initial: Collaboration[] = [];
    const [options, setOptions] = useState(initial);
    const previouslySelectedOrg = getSelectedOrgFromLocalStorage();
    const initialSelected = previouslySelectedOrg ? previouslySelectedOrg : options.length ? options[0] : {} as Collaboration;
    const [selectedOrg, setSelectedOrg] = useState(initialSelected);
    const previouslySelectedProjects = getSelectedProjectsFromLocalStorage();
    const initialSelectedProject = previouslySelectedProjects ? previouslySelectedProjects : [] as SelectedProject[];
    const [selectedProjects, setSelectedProjects] = useState(initialSelectedProject);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
    const previouslySetRefreshInterval = getRefreshIntervalFromLocalStorage()
    const initialRefreshIntervalInMs = previouslySetRefreshInterval ? previouslySetRefreshInterval : 60 * 1000; // 1 minute
    const [refreshInterval, setRefreshInterval] = useState<number>(initialRefreshIntervalInMs)

    useEffect(() => {
        async function getOptions(): Promise<Collaboration[]> {
            if (inMockMode) {
                return getOptionsData();
            } else {
                return get<Collaboration[]>("http://localhost:4000/options")
            }
        }

        const loadOptions = async () => {
            let collaborations = await getOptions();
            setOptions(collaborations);
            if (!previouslySelectedOrg) {
                setSelectedOrg(collaborations[0])
            }
        }

        if (user) {
            loadOptions();
        }
    }, [user])

    const setFollowedSelectedProjects = (projects: SelectedProject[]) => {
        setSelectedProjects(projects);
        saveSelectedProjectsToLocalStorage(projects);
    }

    const setApiTokenAndLogIn = (token: string) => {
        async function login() {
            if (inMockMode) {
                setIsLoggedIn(true);

            } else {
                await post("http://localhost:4000/login", {}, {token});
                setIsLoggedIn(true);
            }

        }

        login();
    }

    const setAndStoreRefreshInterval = (interval: number): void => {
        setRefreshInterval(interval);
        saveRefreshIntervalToLocalStorage(interval);
    }

    const logout = async () => {
        try {
            await post("http://localhost:4000/logout", {}, {});
            setUser(null);
            setIsLoggedIn(false);

        } catch {

        }
    }

    return (
        <Router>
            <div className="App">
                {user ? <Header user={user} options={options} selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} logout={logout}/> : null}
                {user ? <Redirect to={"/"}/> : <Redirect to={"/login"}/>}
                <Route path="/login" exact render={() => <Login isLoggedIn={isLoggedIn} setApiToken={setApiTokenAndLogIn}/>}/>
                <Switch>
                    <SecureRoute path="/" exact user={user} setUser={setUser} render={() => <Dashboard projects={selectedProjects}
                                                                                                       lastRefreshed={lastRefreshed}
                                                                                                       setLastRefreshed={setLastRefreshed}
                                                                                                       refreshInterval={refreshInterval}
                                                                                                       setRefreshInterval={setAndStoreRefreshInterval}/>}/>
                    <SecureRoute path="/edit-projects" exact user={user} setUser={setUser} render={() => <ManageProjects selectedOrg={selectedOrg}
                                                                                                                         selectedProjects={selectedProjects}
                                                                                                                         setSelectedProjects={setFollowedSelectedProjects}/>}/>
                </Switch>

            </div>
        </Router>
    );
}

interface SecureRouteProps {
    render: () => ReactElement
    user: User | null
    setUser: (user: User) => void

    [rest: string]: any
}

const SecureRoute = (props: SecureRouteProps) => {
    const {user, setUser, render, rest} = props;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    useEffect(() => {
        const loadAuth = async () => {
            if (inMockMode) {
                setIsAuthenticated(true);
                setShouldRedirect(false)
            } else {
                try {
                    await get("http://localhost:4000/auth")
                    setIsAuthenticated(true);
                } catch (e) {
                    setShouldRedirect(true)
                }
            }

        }
        loadAuth();

        const loadUser = async () => {
            if (inMockMode) {
                setUser({id: "some Id", login: "UserLoginName", name: "User Name"});
            } else {
                const user = await get<User>("http://localhost:4000/user")
                setUser(user);
            }
        }

        if (user === null) {
            loadUser();
        }
    }, []);

    return (
        <div>
            {isAuthenticated && user && !shouldRedirect ? <Route {...rest} render={render}/> : null}
            {shouldRedirect ? <Redirect to={"/login"}/> : null}
        </div>
    )
}

interface SelectedProject {
    name: string
    branch: string
}

interface AddProjectProps {
    selectedOrg: Collaboration
    selectedProjects: SelectedProject[]
    setSelectedProjects: (projects: SelectedProject[]) => void
}

export const ManageProjects = (props: AddProjectProps) => {
    const {selectedOrg, selectedProjects, setSelectedProjects} = props;

    const projects = useFollowedProjects();
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

interface SelectedProjectsListProps {
    data: SelectedProject[]
    remove: (item: SelectedProject) => void
}

export const SelectedProjectsList = (props: SelectedProjectsListProps) => {
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

interface ProjectSelectorProps {
    data: FollowedProjects[]
    add: (selected: SelectedProject) => void;
}

function ProjectSelector(props: ProjectSelectorProps) {
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

interface DashboardProps {
    lastRefreshed: Date
    projects: SelectedProject[]
    setLastRefreshed: (date: Date) => void
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
}

function Dashboard(props: DashboardProps) {
    const {projects, lastRefreshed, setLastRefreshed, refreshInterval, setRefreshInterval} = props;

    const apiData = useIntervalApiData(projects, refreshInterval, setLastRefreshed);

    const processAPIData: (apiData: ApiData[]) => WidgetData[] = apiData => {
        return apiData.map(data => {
            const getWidgetWorkflows: (data: ApiData) => WidgetWorkflow[] = (data: ApiData) => {
                return data.workflows.map(workflow => {
                    return {
                        name: workflow.name,
                        id: workflow.id,
                        url: `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}`,
                        createdAt: workflow.created_at,
                        status: workflow.status,
                        stoppedAt: workflow.stopped_at || undefined,
                        jobs: data.jobs.filter(workflowJobs => workflowJobs.workflowId === workflow.id).flatMap(workflowJobs => {
                            return workflowJobs.jobs.map(job => {
                                return {
                                    name: job.name,
                                    startedAt: job.started_at,
                                    status: job.status,
                                    stoppedAt: job.stopped_at,
                                    type: job.type,
                                    url: job.job_number ? `https://app.circleci.com/pipelines/${workflow.project_slug}/${workflow.pipeline_number}/workflows/${workflow.id}/jobs/${job.job_number}` : undefined
                                } as WidgetJob
                            })
                        })

                    } as WidgetWorkflow
                });
            }
            const widgetWorkflows = getWidgetWorkflows(data);
            const latestPipeline = data.pipelines.length ? data.pipelines[0] : undefined
            // console.log(apiData);
            const getDuration = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const earliestStartTime = workflows.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0].createdAt;
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : new Date().toISOString();
                return (Date.parse(latestStoppedTime) - Date.parse(earliestStartTime));
            }

            const getFormattedDuration = (durationInMillies: number): string => {
                const difference = new Date(durationInMillies);
                const padNumber = (num: number): string => num < 10 ? `0${num}` : `${num}`
                return `${padNumber((difference.getUTCDate() - 1) * 24 + difference.getUTCHours())}:${padNumber(difference.getUTCMinutes())}:${padNumber(difference.getUTCSeconds())}`;
            }
            const getSince = (workflows: any[]): number => {
                if (!workflows.length) return 0;

                const now = new Date().toISOString();
                const latestStoppedTime = workflows.every(wf => wf.createdAt && wf.stoppedAt) ? workflows.sort((a, b) => Date.parse(b.stoppedAt) - Date.parse(a.stoppedAt))[0].stoppedAt : now;
                return (Date.parse(now) - Date.parse(latestStoppedTime));
            }

            return {
                projectName: data.project.toLocaleUpperCase(),
                pipelineNumber: latestPipeline ? `#${latestPipeline?.number}` : "",
                branch: latestPipeline?.vcs.branch,
                commitSubject: latestPipeline?.vcs.commit?.subject,
                actorName: latestPipeline?.trigger.actor.login,
                repoUrl: latestPipeline?.vcs.origin_repository_url,
                revisionUrl: `${latestPipeline?.vcs.origin_repository_url}/commit/${latestPipeline?.vcs.revision}`,
                duration: getFormattedDuration(getDuration(widgetWorkflows)),
                since: getFormattedSince(getSince(widgetWorkflows)),
                widgetWorkflows: widgetWorkflows

            } as WidgetData;
        })
    }

    const getFormattedSince = (sinceInMillies: number): string => {
        const since = new Date(sinceInMillies);
        const months = since.getUTCMonth();
        if (months > 0) return months > 1 ? `${months} months ago` : `${months} month ago`

        const days = since.getUTCDate() - 1;
        if (days > 0) return days > 1 ? `${days} days ago` : `${days} day ago`

        const hours = since.getUTCHours();
        if (hours > 0) return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`

        const minutes = since.getUTCMinutes();
        if (minutes > 0) return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`

        const seconds = since.getUTCSeconds();
        return seconds > 0 ? seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago` : "";
    }
    const [lastUpdated, setLastUpdated] = useState<string>("");
    useEffect(() => {
        const id = setInterval(() => setLastUpdated(getFormattedSince(new Date().getTime() - lastRefreshed.getTime())), 1000)
        return () => clearInterval(id);
    })

    return (
        <div>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1>PROJECTS</h1>
                    <Link to="/edit-projects">
                        <div title="Manage Projects">
                            <object data={edit} type="image/svg+xml" className="svg">icon</object>
                        </div>
                    </Link>
                </div>
                <LastUpdated lastUpdated={lastUpdated} refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval}/>
            </div>
            <WidgetContainer widgetData={processAPIData(apiData)}/>
        </div>
    );
}

interface LastUpdatedProps {
    lastUpdated: string
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
}

const LastUpdated = (props: LastUpdatedProps) => {
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

interface IntervalModalProps {
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
    close: () => void
}

export const IntervalModal = (props: IntervalModalProps) => {
    const {refreshInterval, setRefreshInterval, close} = props;
    const [inputValue, setInputValue] = useState<number>(refreshInterval);
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(Number(event.target.value) * 1000 || 0);
    const onOk = () => {
        setRefreshInterval(inputValue);
        close();
    }
    const onCancel = () => close();
    return (
        <Modal>
            <div className={styles.intervalModal}>
                <h3>Set Refresh Interval</h3>
                <label htmlFor="input">Interval, seconds</label>
                <input value={inputValue / 1000} onChange={onInputChange} type="number"/>
                <div className={styles.buttonGroup}>
                    <button className={styles.negative} onClick={onCancel}>Cancel</button>
                    <button className={styles.positive} onClick={onOk}>OK</button>
                </div>
            </div>
        </Modal>
    );
};

interface WidgetJob {
    name: string
    status: string
    type: string
    url?: string
    startedAt: string
    stoppedAt?: string
}

interface WidgetWorkflow {
    name: string
    id: string
    url: string
    createdAt: string
    status: string
    stoppedAt?: string
    jobs: WidgetJob[]
}

interface WidgetData {
    projectName: string
    pipelineNumber: string
    branch: string
    commitSubject: string
    actorName: string
    repoUrl: string
    revisionUrl: string
    duration: string
    since: string
    widgetWorkflows: WidgetWorkflow[]
}

interface WidgetContainerProps {
    widgetData: WidgetData[]
}

export const WidgetContainer = (props: WidgetContainerProps) => {
    return (
        <div className={wcStyles.flexContainer}>
            {props.widgetData.map((data, index) => <Widget key={index} data={data}/>)}
        </div>
    );
};

interface Job {
    dependencies: string[]
    id: string
    job_number?: number
    name: string
    project_slug: string
    started_at: string | null
    status: string
    stopped_at?: string
    type: string
}

interface Workflow {
    created_at: string
    id: string
    name: string
    pipeline_id: string
    pipeline_number: number
    project_slug: string
    started_by: string
    status: string
    stopped_at: string
}

interface Pipeline {
    created_at: string
    errors: { message: string, type: string }[]
    id: string
    number: number
    project_slug: string
    state: string
    trigger: { actor: { login: string, avatar_url: string }, received_at: string, type: string }
    updated_at: string
    vcs: { branch: string, commit?: { body: string, subject: string }, origin_repository_url: string, provider_name: string, revision: string, target_repository_url: string }
}

interface WidgetProps {
    data: WidgetData
}

enum WorkflowStatus {
    SUCCESS = "success",
    RUNNING = "running",
    NOT_RUN = "not_run",
    FAILED = "failed",
    ERROR = "error",
    FAILING = "failing",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled",
    UNAUTHORIZED = "unathorized"
}

enum ProjectStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

enum JobStatus {
    SUCCESS = "success",
    RUNNING = "running",
    FAILED = "failed",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled"
}

export function getProjectStatus(workflows: { name: string, status: string }[]): ProjectStatus {
    const uniqueByName = workflows.filter((v, i, a) => a.findIndex(workflow => workflow.name === v.name) === i);
    if (uniqueByName.some(wf => wf.status === WorkflowStatus.RUNNING)) {
        return ProjectStatus.RUNNING;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.CANCELLED)) {
        return ProjectStatus.CANCELLED;
    } else if (uniqueByName.some(wf => wf.status === WorkflowStatus.ON_HOLD)) {
        return ProjectStatus.ON_HOLD;
    } else if (uniqueByName.every(wf => wf.status === WorkflowStatus.SUCCESS)) {
        return ProjectStatus.SUCCESS;
    } else {
        return ProjectStatus.FAILED;
    }
}

export const Widget = (props: WidgetProps) => {
    const {data} = props;
    const statusIcons = {
        "success": success, "failed": failed, "cancelled": cancelled, "on_hold": on_hold, "running": running
    }
    // console.log(data);
    const projectStatus = getProjectStatus(data.widgetWorkflows.map(wwf => ({status: wwf.status, name: wwf.name})))
    const jobStatus = (jobStatus: string) => {
        switch (jobStatus) {
            case JobStatus.SUCCESS:
                return statusIcons[JobStatus.SUCCESS];
            case JobStatus.FAILED:
                return statusIcons[JobStatus.FAILED];
            case JobStatus.CANCELLED:
                return statusIcons[JobStatus.CANCELLED];
            case JobStatus.ON_HOLD:
                return statusIcons[JobStatus.ON_HOLD];
            case JobStatus.RUNNING:
                return statusIcons[JobStatus.RUNNING]
            default:
                return statusIcons[JobStatus.FAILED];

        }
    }

    return (
        <div className={`${styles.widget} ${styles[projectStatus]}`}>
            <h2><a href={data.repoUrl}>{data.projectName}</a></h2>
            <div className={styles.widgetSummary}>
                <div>{data.pipelineNumber}</div>
                <div>{data.branch}</div>
                <div>{data.actorName}</div>
                <div><a href={data.revisionUrl}>{data.commitSubject}</a></div>
            </div>
            <div className={styles.workflowsContainer}>{data.widgetWorkflows.map((wf, index) => {
                return (
                    <div className={styles.workflowContainer} key={index}>
                        <div className={styles.workflowName}><a href={wf.url}>{wf.name}</a></div>
                        <div className={styles.jobs}>{wf.jobs.map((job, index) => {
                            return (
                                <a key={index} href={job.url} title={job.name}>
                                    <div>
                                        <object data={jobStatus(job.status)} type="image/svg+xml" className="svg">icon</object>
                                    </div>
                                </a>
                            )
                        })}</div>
                    </div>
                )
            })}</div>
            <div className={styles.timeMetricsContainer}>
                <div>{data.duration}</div>
                <div>{data.since}</div>
            </div>
        </div>
    );
};

export default App;

function getSelectedOrgFromLocalStorage(): Collaboration | undefined {
    return getFromLocalStorage<Collaboration>("circleci-dashboard-collab-storage");
}

function getSelectedProjectsFromLocalStorage(): SelectedProject[] | undefined {
    return getFromLocalStorage<SelectedProject[]>("circleci-dashboard-projects-storage");
}

function saveSelectedProjectsToLocalStorage(selectedProjects: SelectedProject[]): void {
    saveToLocalStorage("circleci-dashboard-projects-storage", JSON.stringify(selectedProjects));
}

function getRefreshIntervalFromLocalStorage(): number | undefined {
    return getFromLocalStorage<number>("circleci-dashboard-interval-storage");
}

function saveRefreshIntervalToLocalStorage(interval: number): void {
    saveToLocalStorage("circleci-dashboard-interval-storage", `${interval}`);
}

function getFromLocalStorage<T>(key: string): T | undefined {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) as any as T : undefined;
}
