import { useState, useEffect } from 'react';
import axios from './../api/axios'


const useBetCall = () => {
    const [betList, setBetList] = useState([]);

    const betCall = async () => {

        let config = {
            method: 'GET',
            url: '59f08692310000b4130e9f71',
        };

        try {
            const response = await axios(config);
            setBetList(response.data);

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        betCall();
    }, [])

    return betList;
}

export { useBetCall as default };