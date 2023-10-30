import { useState, useEffect } from 'react';

function useDelayedLoading(isLoading: boolean,time: number) {
    const [displayLoading, setDisplayLoading] = useState(false);

    useEffect(() => {
        let timeout: any;

        if (isLoading) {
            setDisplayLoading(true);
        } else {
            timeout = setTimeout(() => {
                setDisplayLoading(false);
            }, time);
        }

        return () => clearTimeout(timeout);
    }, [isLoading]);

    return displayLoading;
}

export default useDelayedLoading;