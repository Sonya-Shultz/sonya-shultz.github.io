import './Register.css'
import axios from 'axios';
const data={user_data:
    {lastName:"", name:"",midleName:"",
    group:"",birth:"",email:""},
password:""};
let passAgain="";

function Register() {
    return (
        <div className="register">
            <h2>Заповніть форму реєстрації!</h2>
            <form className="form" onSubmit={sendData}>
            <p>Прізвище:</p> <input placeholder='Махно' pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" onInput={myChange} id="lastName" type='text'></input>
            <p>Ім'я:</p> <input placeholder='Нестор' pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" onInput={myChange} id="name" type='text'></input>
            <p>По-батькові:</p> <input placeholder='Іванович' pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" onInput={myChange} id="midleName" type='text'></input>
            <p>Група:</p> <input placeholder='ХХ-00' pattern="[а-яА-яіїєІЄЇ]{2}-[0-9]{2}" onInput={myChange} id="group" type='text'></input>
            <p>Дата нар.:</p> <input placeholder='оберіть дату' onInput={myChange} id="birth" type='date'></input>
            <p>E-mail:</p> <input placeholder='example@ex.com' onInput={myChange} id="email" type='email'></input>
            <p>Пароль:</p> <input placeholder='Велика, мала букви, цифра, довше 4' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" onInput={myChange} id="pass" type='password'></input>
            <p>Пароль знову:</p> <input placeholder='Повторіть пароль' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" onInput={myChange} id="passAgain" type='password'></input>
            <input type="submit" id="submit" value="Зареєструватись"/>
            </form>
        </div>
    );
}

function readAllData(){
    data.user_data.lastName=document.getElementById("lastName").value;
    data.user_data.name=document.getElementById("name").value;
    data.user_data.midleName=document.getElementById("midleName").value;
    data.user_data.group=document.getElementById("group").value;
    data.user_data.birth=document.getElementById("birth").value;
    data.user_data.email=document.getElementById("email").value;
    data.user_data.pass=document.getElementById("pass").value;
    passAgain=document.getElementById("passAgain").value;
}

function sendData(event){
    event.preventDefault();
    readAllData();
    if(data.password!=passAgain) {
        window.alert("Пароль не співпадає!");
        return false;
    }
    console.log(data.user_data)
    const session = sessionStorage.getItem('session');

    let token;

    try {
        token = JSON.parse(session).token;
    } catch(e) {}
    if (token) {
        axios({
            headers:{Authorization: token},
            method: 'post',
            url: 'http://localhost:5000/api/allusers',
            data: {
                user_data: data.user_data,
                password: data.password
            }
        }).then(res => {
            console.log(res)
            if (res.data.isAdmin==true){window.location.href='http://localhost:3000/admin'}
            else{
                sessionStorage.setItem('session', JSON.stringify({token:res.data.token}));
                console.log(res)
                window.location.href='http://localhost:3000/'
            }}
        ).catch(er => {
            console.log(er);
        })
    }
    else{
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/allusers',
            data: {
                user_data: data.user_data,
                password: data.password
            }
        }).then(res => {
                sessionStorage.setItem('session', JSON.stringify({token:res.data.token}));
                console.log(res)
                window.location.href='http://localhost:3000/'
        }).catch(er => {
            console.log(er);
        })
    }
}

function myChange(event){
    switch(event.target.id){
        case "lastName":
            data.user_data.lastName=event.target.value;
            break;
        case "name":
            data.user_data.name=event.target.value;
            break;
        case "midleName":
            data.user_data.midleName=event.target.value;
            break;
        case "group":
            data.user_data.group=event.target.value;
            break;
        case "birth":
            data.user_data.birth=event.target.value;
            break;
        case "email":
            data.user_data.email=event.target.value;
            break;
        case "pass":
            data.password=event.target.value;
            break;
        case "passAgain":
            passAgain=event.target.value;
            break;
        default:
            break;
    }
}
  
export default Register;