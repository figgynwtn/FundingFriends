import { useState } from "react";

export default function useToken() {
    function getToken() {
        const tokenString = localStorage.getItem('accessToken');
        const userToken = JSON.parse(tokenString);
        if(userToken) {
            console.log("Found userToken");
            return userToken;
        } else {
            return null;
        }
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('accessToken', JSON.stringify(userToken));
        setToken(userToken)
    }

    return {
        token, setToken: saveToken
    }
}