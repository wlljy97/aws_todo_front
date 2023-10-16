import axios from 'axios';
import React, { useState } from 'react';

function Signup(props) {
    const user = {
        email: "",
        password: "",
        name: ""
    }

    const [ signupUser, setSignupUser ] = useState(user); 

    const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSignupUser({
        ...signupUser,
        [name]: value
    });

    // setSignupUser({
    //   ...signupUser,
    //   [e.target.name]: e.target.value
    // });
    }

    const handleSignupSubmit = async () => {
        // axios.post("http://localhost:8080/auth/signup", {
        //   email: "aaa@gmail.com",
        //   password: "1q2w3e4r!",
        //   name: "김준일"
        // })

        //비동기(프로미스)
        try {
            await axios.post("http://localhost:8080/auth/signup", signupUser);
            // 로그인 페이지로 이동
        }catch(error) {
            const responseErrors = error.response.data;
            const keyList = Object.keys(responseErrors);

            if(keyList.includes("email")) {
            alert(responseErrors.email);
            }else if(keyList.includes("password")){
            alert(responseErrors.password);
            }else if(keyList.includes("name")){
            alert(responseErrors.name);
            }else {
            alert("회원가입 실패");
            }

        }
    }
    return (
        <div>
            <h1>
            회원가입
            </h1>
            <div><input type="text" name='email' placeholder='이메일' onChange={handleInputChange} /></div>
            <div><input type="password" name='password' placeholder='비밀번호' onChange={handleInputChange} /></div>
            <div><input type="text" name='name' placeholder='이름' onChange={handleInputChange} /></div>
            <button onClick={handleSignupSubmit}>가입하기</button>
        </div>
    );
}

export default Signup;