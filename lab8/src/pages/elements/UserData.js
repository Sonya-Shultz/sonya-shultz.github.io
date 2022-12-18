import React from "react";
import axios from 'axios';
import './UserData.css'

const roleVal=["user", "admin"]

class UserData extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user_t:{},
            new_user:{},
            number: props.number,
            type_btn: "Редагувати"
        }
        this.myChange = this.myChange.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeBack = this.changeBack.bind(this);
        this.delete = this.delete.bind(this);
    }

    myChange(event){
        const new_user_tmp = Object.assign({}, this.state.new_user)
        switch(event.target.id){
            case "lastName":
                new_user_tmp.lastName=event.target.value;
                break;
            case "name":
                new_user_tmp.name=event.target.value;
                break;
            case "midleName":
                new_user_tmp.midleName=event.target.value;
                break;
            case "group":
                new_user_tmp.group=event.target.value;
                break;
            case "birth":
                new_user_tmp.birth=event.target.value;
                break;
            case "type":
                if (roleVal.includes(event.target.value))
                event.target.valid=true;
                else event.target.valid=false;
                new_user_tmp.type=event.target.value;
                break;
            default:
                break;
        }
        this.setState((ps)=>({
            user_t:{...ps.user_t},
            number:{...ps.number},
            new_user:{...new_user_tmp},
            type_btn: ps.type_btn
        }))
    
    }

    delete(event){
        let num=event.target.getAttribute("number");
        let em=document.querySelector("#userDataForm"+num+">#email").innerText;
        let ty=document.querySelector("#userDataForm"+num+">#type").value;
        const session = sessionStorage.getItem('session');
        let token;
        try {
            token = JSON.parse(session).token;
        } catch(e) {}
        console.log(em,ty)
        if(token)
            axios({
                headers:{Authorization: token},
                method: 'delete',
                url: 'http://localhost:5000/api/allusers',
                data: {
                    useremail: em,
                    usertype: ty
                }
            }).then(res => {
                window.alert("Цей акаунт видалено!");
                if(!res.data.isAdmin){
                    sessionStorage.removeItem('session');
                    window.location.href='http://localhost:3000/login';
                }
                else window.location.href='http://localhost:3000/admin';
            }).catch(er => { window.alert("У вас недостатньо прав, або ви єдинний адміністратор!");})
    }
    
    async changeType(event){
        event.preventDefault();
        let num=event.target.getAttribute("number");
        let isSave=document.querySelector("#userDataForm"+num+">#submit").value;
        
        let isA = await isAdmin();
        document.querySelectorAll("#userDataForm"+num+">input").forEach(el =>{
            if (el.id!="submit"){
                el.disabled=!el.disabled;
                if(!isA && el.id=="type") el.disabled=!el.disabled;
            }
        })
        if(isSave=="Зберегти"){
            const session = sessionStorage.getItem('session');
    
            let token;
            try {
                token = JSON.parse(session).token;
            } catch(e) {return false;}
            if(token)
                axios({
                    headers:{Authorization: token},
                    method: 'patch',
                    url: 'http://localhost:5000/api/allusers',
                    data: {
                        user: this.state.new_user
                    }
                }).then(res => {
                    if (!isA ){
                        sessionStorage.setItem('session', JSON.stringify(res.data));
                    }
                    this.setState({user_t: JSON.parse(JSON.stringify(this.state.new_user)), type_btn:"Редагувати"})}
                ).catch(er => {
                    this.changeBack(); return false;
                })
        }
        else{
            let tmp={}
            tmp.name = document.querySelector("#userDataForm"+num+">#name").value;
            tmp.lastName = document.querySelector("#userDataForm"+num+">#lastName").value;
            tmp.midleName = document.querySelector("#userDataForm"+num+">#midleName").value;
            tmp.group = document.querySelector("#userDataForm"+num+">#group").value;
            tmp.email = document.querySelector("#userDataForm"+num+">#email").innerText;
            tmp.type = document.querySelector("#userDataForm"+num+">#type").value;
            tmp.birth = document.querySelector("#userDataForm"+num+">#birth").value;
            this.setState({new_user:{...tmp}, user_t:{...tmp}, number:{num}, type_btn:"Зберегти"})
        }
        return true;
    }
    
    changeBack(){
        let elems = document.querySelectorAll("#userData"+this.number+">input");
        if (elems && elems.length>0){
        elems[0].value=this.state.user_t.lastName;
        elems[1].value=this.state.user_t.name;
        elems[2].value=this.state.user_t.midleName;
        elems[3].value=this.state.user_t.group;
        elems[4].value=this.state.user_t.birth;
        }else {
            window.alert('Щось пішло не так (\nСпробуйте пізніше!');
        }
    }

    render(){
        return (
            <div className="userData" id={'userData'+this.props.number}>
                <form id={'userDataForm'+this.props.number} onSubmit={this.changeType} number={this.props.number}>
                <p>Прізвище:</p> <input pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" disabled onInput={this.myChange} type="text" defaultValue={this.props.user.lastName} id="lastName"></input>
                <p>Ім'я:</p> <input pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" disabled onInput={this.myChange} type="text" defaultValue={this.props.user.name} id="name"></input>
                <p>По-батькові:</p> <input pattern="[a-zA-Zа-яА-ЯієїІЄЇ'-]{1,}" disabled onInput={this.myChange} type="text" defaultValue={this.props.user.midleName} id="midleName"></input>
                <p>Група:</p> <input pattern="[а-яА-яіїєІЄЇ]{2}-[0-9]{2}" disabled onInput={this.myChange} type="text" defaultValue={this.props.user.group} id="group"></input>
                <p>Дата нар.:</p> <input disabled onInput={this.myChange} type="date" defaultValue={this.props.user.birth} id="birth"></input>
                <p>E-mail:</p> <p id='email'>{this.props.user.email}</p>
                <p>type:</p> <input disabled onInput={this.myChange} type="text" defaultValue={this.props.user.type} id="type"></input>
                <input type="submit" id="submit" number={this.props.number} value={this.state.type_btn}/>
                </form>
                <button onClick={this.delete} number={this.props.number}>Видалити</button>
            </div>
        );
    }
}
  
async function isAdmin(){
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

export default UserData;