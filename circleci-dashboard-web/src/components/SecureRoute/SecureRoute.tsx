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

export default (props: SecureRouteProps) => {
    const {user, setUser, render, rest, inMockMode} = props;
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