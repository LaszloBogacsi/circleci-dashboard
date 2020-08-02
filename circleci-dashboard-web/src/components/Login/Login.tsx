import React, {ChangeEvent, ReactElement, useState} from "react";
import {Redirect} from "react-router-dom";
import styles from "./style.module.css";
import addIcon from "img/plus.svg";

interface APITokenInputProps {
    isLoggedIn: boolean
    setApiToken: (token: string) => void;
}

export default (props: APITokenInputProps): ReactElement => {
    const {isLoggedIn, setApiToken} = props;
    const initialState = "";
    const [inputValue, setInputValue] = useState<string>(initialState);
    const placeHolderText = "circleci api token";
    const onClick: () => void = () => {
        setApiToken(inputValue);
        setInputValue(initialState);
    }
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value || "");

    return (
        <div className={styles.login}>
            <h1>Login with your CircleCI API token</h1>
            <div>
                <div className={styles.tokenInput}>
                    <input value={inputValue} onChange={onInputChange} type="text" placeholder={placeHolderText}/>
                    <div onClick={onClick}>
                        <object data={addIcon} type="image/svg+xml" className="svg">icon</object>
                    </div>
                </div>
                {isLoggedIn ? <Redirect to={"/"}/> : null}
            </div>
        </div>
    )
}