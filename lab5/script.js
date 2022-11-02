wrongElem = [];
checkStr = [
    /^[а-яА-яіїєІЄЇ]+ [а-яА-яіїєІЄЇ][.][а-яА-яіїєІЄЇ][.]$/,
    /^[а-яА-яіїєІЄЇ]{4}$/,
    /^\d{2}[.]\d{2}[.]\d{4}$/,
    /^[м][.][а-яА-яіїєІЄЇ]+$/,
    /^\S+@\S+\.\S+$/
];
dataInEl = ["-","-","-","-","-"]

function rightDate(str){
    d = new Date(str);
    res="";
    if(d.getDate()<10) res+="0";
    res+=d.getDate()+".";
    if(d.getMonth()+1<10) res+="0";
    res+=((d.getMonth()+1)+"."+d.getFullYear());
    return res;
}

function checkagain(){
    el= this.event.target;
    id = Number.parseInt(el.id.substr(2)) - 1;
    value = el.value;
    if (id==2) value = rightDate(value);
    if(!checkStr[id].test(value) && !el.value.length<=0){highlightWrong(el);}
    else {cancelHightlight(el);}
}
 
function check(){
    for (i=0;i<5;i++){
        elem = document.getElementById("in"+(i+1));
        value = elem.value;
        if (i==2) value = rightDate(value);
        if(!checkStr[i].test(value)){wrongElem.push(elem);}
        dataInEl[i]=value;
    }
}

function mySend() {
    for (i=0;i<5;i++){
        elem = document.getElementById("out"+(i+1));
        elem.textContent = dataInEl[i];
    }
}

function highlightWrong(elem){
    elem.classList.add("wrongData");
}

function cancelHightlight(elem){
    elem.classList.remove("wrongData");
}

function sendOrNot(){
    this.event.preventDefault();
    check();
    if (wrongElem.length <= 0){
        mySend();
    }
    else {
        for (i=0; i<wrongElem.length; i++) {
            highlightWrong(wrongElem[i]);
        };
    }

    wrongElem = [];
}