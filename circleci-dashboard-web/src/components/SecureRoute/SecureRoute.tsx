import React, {ReactElement, useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {User} from "domain/User";
import {get} from "utils/http";

interface SecureRouteProps {
    inMockMode: boolean
    render: () => ReactElement
    user: User | null
    setUser: (user: User) => void

    [rest: string]: any
}
const API_BASE_URL = "http://localhost:4000";

export default (props: SecureRouteProps) => {
    const {user, setUser, render, rest, inMockMode} = props;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    useEffect(() => {
        const loadAuth = async () => {
            try {
                await get(`${API_BASE_URL}/auth`)
                setIsAuthenticated(true);
            } catch (e) {
                setShouldRedirect(true)
            }
        }

        const loadMockAuth = async () => {
            setIsAuthenticated(true);
            setShouldRedirect(false)
        }

        inMockMode ? loadMockAuth() : loadAuth();

        const loadUser = async () => setUser(await get<User>(`${API_BASE_URL}/user`))
        const loadMockUser = async () => setUser({id: "some Id", login: "UserLoginName", name: "User Name"})

        if (user === null) {
            inMockMode ? loadMockUser() : loadUser();
        }
    }, []);

    return (
        <div>
            {isAuthenticated && user && !shouldRedirect ? <Route {...rest} render={render}/> : null}
            {shouldRedirect ? <Redirect to={"/login"}/> : null}
        </div>
    )
}
