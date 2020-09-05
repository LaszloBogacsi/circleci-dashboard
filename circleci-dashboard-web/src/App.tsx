import React, {useEffect, useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {getOptionsData} from "./MockResponse";
import SecureRoute from "components/SecureRoute/SecureRoute";
import Header from "components/Header/Header";
import Login from "components/Login/Login";
import Dashboard from "components/Dashboard/Dashboard";
import ManageProjects from "components/ProjectsManager/ProjectsManager";
import {getFromLocalStorage, saveToLocalStorage} from "utils/localStorage";
import {getCollaborations, postLogin, postLogout} from "utils/http";
import {User} from "domain/User";
import {Collaboration} from "domain/Collaboration";
import {SelectedProject} from "domain/SelectedProject";


const inMockMode = false;

export default function App() {
    const previouslySelectedOrg = getSelectedOrgFromLocalStorage();
    const previouslySelectedProjects = getSelectedProjectsFromLocalStorage();
    const previouslySetRefreshInterval = getRefreshIntervalFromLocalStorage()

    const [options, setOptions] = useState<Collaboration[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<Collaboration>(previouslySelectedOrg ? previouslySelectedOrg : options.length ? options[0] : {} as Collaboration);
    const [selectedProjects, setSelectedProjects] = useState<SelectedProject[]>(previouslySelectedProjects ? previouslySelectedProjects : [] as SelectedProject[]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
    const [refreshInterval, setRefreshInterval] = useState<number>(previouslySetRefreshInterval ? previouslySetRefreshInterval : 60 * 1000)  // 1 minute

    useEffect(() => {
        const loadOptions = async () => {
            const collaborations = await getCollaborations();
            setOptions(collaborations);
            if (!previouslySelectedOrg) {
                setSelectedOrg(collaborations[0])
            }
        }
        const loadMockOptions = async () => {
            const collaborations = await getOptionsData();
            setOptions(collaborations);
            if (!previouslySelectedOrg) {
                setSelectedOrg(collaborations[0])
            }
        }

        if (user) {
            inMockMode ? loadMockOptions() : loadOptions();
        }
    }, [user])

    const setFollowedSelectedProjects = (projects: SelectedProject[]) => {
        setSelectedProjects(projects);
        saveSelectedProjectsToLocalStorage(projects);
    }

    const setApiTokenAndLogIn = (token: string) => {
        async function login() {
            await postLogin(token);
            setIsLoggedIn(true);
        }
        const loginMock = async () => setIsLoggedIn(true)
        inMockMode ? loginMock() : login();
    }

    const setAndStoreRefreshInterval = (interval: number): void => {
        setRefreshInterval(interval);
        saveRefreshIntervalToLocalStorage(interval);
    }

    const logout = async () => {
        try {
            await postLogout();
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
                    <SecureRoute path="/" exact inMockMode={inMockMode} user={user} setUser={setUser} render={() => <Dashboard projects={selectedProjects}
                                                                                                                               lastRefreshed={lastRefreshed}
                                                                                                                               setLastRefreshed={setLastRefreshed}
                                                                                                                               refreshInterval={refreshInterval}
                                                                                                                               setRefreshInterval={setAndStoreRefreshInterval}
                                                                                                                               inMockMode={inMockMode}/>}/>
                    <SecureRoute path="/edit-projects" exact inMockMode={inMockMode} user={user} setUser={setUser} render={() => <ManageProjects selectedOrg={selectedOrg}
                                                                                                                                                 selectedProjects={selectedProjects}
                                                                                                                                                 setSelectedProjects={setFollowedSelectedProjects}
                                                                                                                                                 inMockMode={inMockMode}/>}/>
                </Switch>

            </div>
        </Router>
    );
}

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
