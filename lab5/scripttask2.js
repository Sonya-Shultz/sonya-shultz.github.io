document.addEventListener("DOMContentLoaded", myOnReady);

isDblCl = false;

rowc= 6;
colc=6;
variant=8;
bl_size=7;

function myOnReady(){
    for (i=0; i<rowc;i++){
        tmprow =  document.createElement('tr');
        tmprow.id = "tr"+i;
        tmprow.classList.add("myRow");
        for (j=0;j<colc;j++){
            tmpcell = document.createElement('th');
            id = (i*rowc+j+1);
            tmpcell.id = "th"+id;
            tmpcell.textContent=id;
            tmpcell.classList.add("myCell");
            if (j%2==i%2) tmpcell.classList.add("cellL");
            else tmpcell.classList.add("cellR");
            tmprow.append(tmpcell);
        }
        alltbl = document.getElementById("myTable");
        alltbl.append(tmprow);
    }

    myCell = document.getElementById("th"+variant);

    myCell.addEventListener("mouseenter", randomChange);

    myCell.style.position="relative";
    tmpColor = document.createElement('input');
    tmpColor.type="color";
    tmpColor.id="colorPick";
    tmpColor.addEventListener("change", hidePicker);
    document.getElementById("myTable").append(tmpColor);

    myCell.addEventListener("click", showPickerOne);
    myCell.addEventListener("dblclick", showPickerRow);

}

function showPickerOne(){
    isDblCl=false;
    tmp = document.getElementById("colorPick");
    tmp.style.display="block"
    tmp.style.top = "0";
    ind = variant - Math.floor(variant/colc)*colc
    tmp.style.left = (bl_size*ind)+"vmin";
}

function showPickerRow(){
    isDblCl=true;
    tmp = document.getElementById("colorPick");
    tmp.style.display="block"
    tmp.style.top = "0";
    tmp.style.left = (bl_size*colc)+"vmin";
    chAllColor("gray");
}

function hidePicker(){
    if (!isDblCl)
        document.getElementById("th"+variant).style.backgroundColor=this.value;
    else{
        chAllColor(this.value);
    }
    this.style.display="none";
}

function randomChange() {
    max=256;
    r = Math.floor(Math.random() * max);
    g = Math.floor(Math.random() * max);
    b = Math.floor(Math.random() * max);
    this.style.backgroundColor="rgb("+r+","+g+","+b+")"
}

function chAllColor(col){
    for (i=Math.floor(variant/colc)*colc+1; i<Math.floor(variant/colc)*colc+colc+1;i++){
        if (i>=variant && variant%2==i%2){
            document.getElementById("th"+i).style.backgroundColor=col;
        }
    }
}
