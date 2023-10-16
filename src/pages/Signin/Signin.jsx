import axios from 'axios';
import React, { useState } from 'react';

function Signin(props) {

    const user = {
        email: "",
        password: ""
    }

    const [ signinUser, setSigninUser ] = useState(user);

    const handleInputChange = (e) => {
        setSigninUser({
            ...signinUser, 
            [e.target.name]: e.target.value
        });
    }

    const handleSigninSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/signin", signinUser);
            localStorage.setItem("accessToken", "Bearer " + response.data);
            window.location.replace("/");
        }catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>로그인</h1>
            <div><input type="text" name='email' onChange={handleInputChange} placeholder='이메일' /></div>
            <div><input type="password" name='password' onChange={handleInputChange} placeholder='비밀번호'/ ></div>
            <button onClick={handleSigninSubmit}>로그인</button>
        </div>
    );
}

export default Signin;