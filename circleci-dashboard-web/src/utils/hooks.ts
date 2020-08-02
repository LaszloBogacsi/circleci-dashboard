import {useEffect} from "react";

export function useInterval(callback: (cancelledState: () => boolean) => void, delay: number, runImmediatley: boolean) {
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
