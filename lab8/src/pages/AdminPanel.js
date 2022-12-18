import './AdminPanel.css'
import WrongAcsess from './WrongAcsess';
import axios from 'axios';
import UserData from './elements/UserData';
import {useState, useEffect} from 'react';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const us= getUsersList();
        useEffect(()=> {
            us.then(data => setUsers(data));
        },[])

    if (isAdmin() && users){

        let i=0;
        return (
            <div className="adminPanel">
                <a className="link" href='http://localhost:3000/register'>Add new user</a>
                <div className='usersList'>
                    {users.map(function(obj){
                        i++;
                        return <UserData user={users[i-1]} key={i} number={i}/>
                    })}
                </div>
            </div>
        );
    }
    else return (<WrongAcsess/>)
}

async function getUsersList(){
    const session = sessionStorage.getItem('session');

    let token;
    try {
        token = JSON.parse(session).token;
    } catch(e) {}
    if (token){
        return axios.get('http://localhost:5000/api/allusers',{
            headers:{Authorization: token}
        }).then(res=> {
            if (res.data.permision=="NO")
                return null;
            return res.data.users;
        })
    }
    else return (null);
}


function isAdmin(){
    const session = sessionStorage.getItem('session');

    let token;

    try {
        token = JSON.parse(session).token;
    } catch(e) {}
    if (token) {
        return axios.get('http://localhost:5000/api/adm',{
            headers: {
                Authorization: token
            }
        }).then(res => {return res.data.isAdmin})
    }
    else return false

}
  
export {AdminPanel, isAdmin};