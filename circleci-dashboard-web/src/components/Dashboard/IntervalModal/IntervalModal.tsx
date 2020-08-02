import React, {ChangeEvent, useState} from "react";
import Modal from "components/shared/Modal";
import btn from "components/shared/style.module.css";
import styles from "./style.module.css";
import ButtonGroup from "components/shared/ButtonGroup";
import Button from "components/shared/Button";

interface IntervalModalProps {
    refreshInterval: number
    setRefreshInterval: (newInterval: number) => void
    close: () => void
}

export default(props: IntervalModalProps) => {
    const {refreshInterval, setRefreshInterval, close} = props;
    const [inputValue, setInputValue] = useState<number>(refreshInterval);
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(toMilliSeconds(event.target.value) || 0);
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
                <input value={toSeconds(inputValue)} onChange={onInputChange} type="number"/>
                <ButtonGroup>
                    <Button className={btn.buttonNegative} onClick={onCancel} buttonText={"Cancel"}/>
                    <Button className={btn.buttonPositive} onClick={onOk} buttonText={"OK"}/>
                </ButtonGroup>
            </div>
        </Modal>
    );
};

const toMilliSeconds = (valueInSeconds: string) => Number(valueInSeconds) * 1000;
const toSeconds = (valueInMilliSeconds: number) => valueInMilliSeconds / 1000;
