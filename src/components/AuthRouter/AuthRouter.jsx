import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function AuthRouter({ element }) {

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/auth"];
    const [ elementState, setelementState ] = useState(<></>); 

    useEffect(() => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        axios.get("http://localhost:8080/authenticated", option)
        .then((response) => {
            for(let path of permitAllPath) {
                if(pathname.startsWith(path)) {
                    navigate("/");
                }
            }
        })
        .catch((error) => {
            let flag = false;
            for(let path of permitAllPath) {
                if(pathname.startsWith(path)) {
                    flag = true;
                }
            }
            if(!flag) {
                navigate("/auth/signin");
            }
        })
        .finally(() => {
            setelementState(element);
        });
    }, [elementState]) 
    

    return elementState;
}

export default AuthRouter;