const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const port = 5000;

const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SESSION_KEY = 'Authorization';
const prKey = 'banana';
const admin_user={
    user_data:{
        lastName:"Roukin",
        name:"Samuel",
        midleName:"-",
        group:"IP-96",
        birth:"1980-08-15",
        email:"excod@ghost.com",
        type:"admin"
    },
    password:"banana"
}

function sign(myData){
    return jwt.sign(myData, prKey, {expiresIn: '24h'});
}

function verify(token){
    try{return jwt.verify(token, prKey)}
    catch(e){ return null}
}

function decode(token){
    try{return jwt.decode(token)}
    catch(e) {return null}
}

class DB{
    #db=[];
    constructor(){
        try {
            this.#db=fs.readFileSync('./users.json', 'utf8');
            this.#db=JSON.parse(this.#db.trim());
        }
        catch (e) {
            this.#db=[admin_user];
        };
    }
    
    addNew(user_t, password_t){
        user_t.type="user";
        for (let i=0; i< this.#db.length; i++){
            if(user_t.email==this.#db[i].user_data.email){
                throw 'Same user!';
            }
        }
        this.#db.push({user_data: user_t, password: password_t})
        this.save();
    }

    change(user_t){
        for (let i=0; i<this.#db.length; i++){
            if (this.#db[i].user_data.email==user_t.email){
                this.#db[i].user_data.name = user_t.name;
                this.#db[i].user_data.lastName = user_t.lastName;
                this.#db[i].user_data.midleName = user_t.midleName;
                this.#db[i].user_data.birth = user_t.birth;
                this.#db[i].user_data.group = user_t.group;
                this.#db[i].user_data.type = user_t.type;
                this.save();
                return;
            }
        }
    }

    delete(user_mail){
        this.#db=this.#db.filter(el => {return el.user_data.email!=user_mail});
        this.save();
    }
    
    save(){
        fs.writeFileSync('./users.json', JSON.stringify(this.#db), 'utf-8');
    }

    getAllSafe(){
        const tmp=[];
        for(let i=0; i<this.#db.length;i++){
            tmp.push(this.#db[i].user_data)
        }
        return tmp;
    }
    getAll(){
        const tmp=[];
        for(let i=0; i<this.#db.length;i++){
            tmp.push(this.#db[i])
        }
        return tmp;
    }
}

const users = new DB;

function getUserByToken(token){
    const tmp = verify(token);
    if (tmp){
        const tmpUs = users.getAll().find(el => el.user_data.email == tmp.user.email)
        if (tmpUs){ return tmpUs.user_data}
    }
    return null;
}

app.use((req, res, next) => {
    let sessionId = req.get(SESSION_KEY);
    req.user = getUserByToken(sessionId);
    req.sessionId = sessionId;
    cors({origin:"http://localhost:3000/"})
    next();
});
app.use(cors({
    methods:['GET', 'POST', 'OPTION', 'DELETE', 'PATCH'],
    origin:["http://localhost:3000","*"]
}))

app.get('/', (req, res) => {
    if (req.user) {
        return res.json({
            user: req.user,
        })
    }
})

app.get('/api/adm', (req, res) => {
    let sessionId = req.get(SESSION_KEY);
    req.sessionId = sessionId;
    if (sessionId && verify(sessionId) && verify(sessionId).user.type=='admin') {
        return res.json({
            isAdmin: true,
        })
    }
    else return res.json({
        isAdmin: false,
    })
})

app.get('/api/allusers', (req, res) => {
    let sessionId = req.get(SESSION_KEY);
    req.sessionId = sessionId;
    if (sessionId && verify(sessionId) && verify(sessionId).user.type=='admin') {
        return res.json({
            permision:"YES",
            users: users.getAllSafe(),
        })
    }
    else return res.json({
        permision: "NO",
        users: []
    })
})

app.post('/api/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const user_t = users.getAll().find((user) => { 
        return user.user_data.email==email && user.password==password});
    
    if (user_t) {
        const token = sign({user: user_t.user_data});
        res.json({ token: token});
    }

    res.status(401).send();
});

app.post('/api/allusers', (req, res) =>{
    const {user_data, password} = req.body;
    let sessionId = req.get(SESSION_KEY);
    req.sessionId = sessionId;
    if (sessionId && verify(sessionId) && verify(sessionId).user.type=="admin"){
        try{
        users.addNew(user_data, password);
        res.json({ isAdmin: true});
        }catch(e){
            console.log(e);
            res.status(401).send();
        }  
    }
    else{
        console.log();
        try{
            users.addNew(user_data, password);
            const user_t = users.getAll().find((user) => { 
                return user.user_data.email==user_data.email && user.password==password});

            if (user_t) {
                const token = sign({user: user_t.user_data});
                res.json({ isAdmin:false,token: token});
            }
        } catch(e){
            console.log(e);
            res.status(401).send();
        }   
    }

    res.status(401).send();
})

app.patch('/api/allusers', (req, res) =>{
    const {user} = req.body;
    let sessionId = req.get(SESSION_KEY);
    req.sessionId = sessionId;
    if (sessionId && verify(sessionId) &&
     (user.email==verify(sessionId).user.email || verify(sessionId).user.type=="admin")){
        users.change(user);
        const user_t = users.getAll().find((user_el) => { 
            return user.email==user_el.user_data.email});
        if (user_t) {
            users.save();
            const token = sign({user: user_t.user_data});
            res.json({ token: token});
        } 
    }
    res.status(401).send();
})

app.delete('/api/allusers', (req,res) =>{
    const {useremail, usertype} = req.body;
    let sessionId = req.get(SESSION_KEY);
    req.sessionId = sessionId;
    if (sessionId && verify(sessionId) && 
    (verify(sessionId).user.type=="admin" || verify(sessionId).user.email==useremail)){
        if (usertype=="admin"){
            if (users.getAllSafe().filter(el => el.type=="admin").length>1){
                users.delete(useremail);
                let ans = verify(sessionId).user.type=="admin";
                if(verify(sessionId).user.email==useremail) ans=false;
                return res.json({status:"done", isAdmin:ans})
            }
        }
        else{
            users.delete(useremail);
            let ans = verify(sessionId).user.type=="admin";
            return res.json({status:"done", isAdmin:ans})
        }
    }
    res.status(401).send();
})

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})