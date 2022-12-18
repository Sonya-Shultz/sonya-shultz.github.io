import './Data.css'
import UserData from './elements/UserData';
import WrongAcsess from './WrongAcsess';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Data() {
    const [userData, setUsers] = useState({});
    useEffect(()=> {
        try{
        let userD_t=isLogIn();
        userD_t.then(data => setUsers(data)).catch();
        } catch(e){}
    },[])

    if(userData)
    return (
        <div className="data">
            <h2>Ваші дані:</h2>
            <UserData user={userData} number={0}></UserData>
            <button onClick={logOut}>LogOut</button>
        </div>
    );
    else return (<WrongAcsess/>)
}

function logOut(){
    sessionStorage.removeItem('session');
    window.location.href='http://localhost:3000/login';
}

function isLogIn(){
    const session = sessionStorage.getItem('session');

    let token;

    try {
        token = JSON.parse(session).token;
    } catch(e) {}
    if (token) {
        return axios.get('http://localhost:5000/',{
            headers: {
                Authorization: token
            }
        }).then(res => {return res.data.user})
    }
    else {
        window.alert("Спершу авторизуйтесь в систему!");
        window.location.href='http://localhost:3000/login';
    }
}
  
export default Data;