import './LogIn.css'
import axios from 'axios';

const us={email:"", password:""}

function LogIn() {
    return (
        <div className="login">
            <h3>ВІТАЮ В ЛАБ8!</h3>
            <form className="form" onSubmit={check_data}>
            <p>E-mail:</p>
            <input id="email" type='email' onChange={e=>us.email=e.target.value} placeholder="example@ex.com" required></input>
            <p>Пароль:</p>
            <input id="pass" type='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}" placeholder='велика та мала букви, цифра' onChange={e=>us.password=e.target.value} required></input>
            <input type="submit" id="submit" value="LogIn"/>
            </form>
            <a href='http://localhost:3000/register'>Або зареєструватись тут!</a>
        </div>
    );
}

function check_data(event){
    event.preventDefault();
    sendData()
}
  
function sendData(){
    us.email=document.getElementById("email").value;
    us.password=document.getElementById("pass").value
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/login',
        data: {
            email:us.email,
            password:us.password
        }
    }).then(res => {
        sessionStorage.setItem('session', JSON.stringify(res.data));
        console.log(res)
        window.location.href='http://localhost:3000/'
    }
    ).catch(er => {console.log(er); window.alert("Помилка входу!")})
}

export default LogIn;