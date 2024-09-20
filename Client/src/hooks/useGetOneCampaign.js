import { useState, useEffect } from "react";
import axios from 'axios';

function useGetOneCampaign(dataSource) {
    const[loading, setLoading] = useState(false);
    const[campaign, setCampaign] = useState({});
    const[error, setError] = useState('');

    useEffect(() => {
        const loadCampaign = async () => {
            try {
                const response = await axios.get(dataSource);
                setCampaign(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
                console.error(err);
            }
        };

        setLoading(true);
        loadCampaign();
    }, [dataSource]);

    return [loading, error, campaign];
}

export default useGetOneCampaign;