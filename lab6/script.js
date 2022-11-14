document.addEventListener("DOMContentLoaded", onMyReady);

var id_count=0;
var col_w = 250;

var myData = {picture:"",postcode:"",coordinates:"",email:"",city:""}

function onMyReady(){
    changeLayOut();
    downloadBtn = document.getElementById("Downloadbtn");
    downloadBtn.addEventListener("click", loadData);
}

function changeLayOut(){
    size = document.body.clientWidth - 0.04* Math.min(document.body.clientWidth, document.body.clientHeight);
    col=Math.floor(size/col_w);
    r = document.getElementById("resultArea");
    r.style.gridTemplateColumns="repeat("+col+", 1fr)";
}

window.onresize = changeLayOut;

function loadData(){
    resText=document.getElementById("resultText");
    fetch('https://randomuser.me/api').then(res => {
        resText.innerText="Завантаження...";
        return res.json();
    }).then(ans=>{
        data=ans.results[0];
        myData.picture=data.picture.large;
        myData.postcode=data.location.postcode;
        myData.coordinates=data.location.coordinates;
        myData.email=data.email;
        myData.city=data.location.city;
    }).then(el=>{
        createHuman();
        resText.innerText="Готово!";
    }).catch(er =>{
        console.log(er);
        resText.innerText="Щось пішло не так!";
    })
}

function createHuman() {
    div = document.createElement("div");
    div.classList.add("myHuman");
    div.id="human"+id_count;
    id_count+=1;

    img = document.createElement("img");
    img.src=myData.picture;
    postc = document.createElement("p");
    postc.innerText="Postcode: "+myData.postcode;
    coord = document.createElement("p");
    coord.innerText="Coordinates: "+myData.coordinates.latitude+"; "+myData.coordinates.longitude;
    email = document.createElement("p");
    email.innerText="Email: "+myData.email;
    email.classList.add("myEmail");
    city = document.createElement("p");
    city.innerText="City: "+myData.city;

    div.append(img);
    div.append(postc);
    div.append(coord);
    div.append(email);
    div.append(city);

    document.getElementById("resultArea").prepend(div);

}