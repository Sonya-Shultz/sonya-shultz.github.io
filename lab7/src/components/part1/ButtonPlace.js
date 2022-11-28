import React from "react";

class ButtonPlace extends React.Component {
    render() {
        return(
            <div className="button_div">
                <input type="button" className="btn" onClick={addBtn} value="ДОДАТИ"/>
                <input type="button" className="btn" onClick={deleteBtn} value="ВИДАЛИТИ"/>
                <input type="button" className="btn" onClick={zoominBtn} value="ЗБІЛЬШИТИ"/>
                <input type="button" className="btn" onClick={zoomoutBtn} value="ЗМЕНШИТИ"/>
            </div>
        )
    }
}

function addBtn(e){
    let max_img=20;
    let photoHolder = document.getElementById("photoHolder");
    if (photoHolder.childElementCount === max_img) alert("ОГО! Наклацано більше "+max_img+" картинок(и)... \n Але хто я така, щоб тебе зупиняти?! \n ¯\\\_( ͡❛ ▿ ͡❛)_/¯")
    let ph = document.createElement('img');
    ph.src="https://picsum.photos/500/200?random="+Math.floor(Math.random() * 13131313);
    ph.className="new_img";
    ph.id = "photo"+photoHolder.childElementCount;
    photoHolder.append(ph);
}
function deleteBtn(e){
    let photoHolder = document.getElementById("photoHolder");
    if (photoHolder.childElementCount > 0){
        let ph = document.querySelector("img.new_img#photo"+(photoHolder.childElementCount-1));
        ph.remove();
    } else {alert("Немає зображень для видалення!")}
}
function zoominBtn(e){
    var scaleFactor = 1.2;
    let photoHolder = document.getElementById("photoHolder");
    let ph = document.querySelector("img.new_img#photo"+(photoHolder.childElementCount-1));
    let size = parseInt(window.getComputedStyle(ph).width);
    ph.style.width=(size*scaleFactor)+"px"
}
function zoomoutBtn(e){
    var scaleFactor = 1.2;
    let photoHolder = document.getElementById("photoHolder");
    let ph = document.querySelector("img.new_img#photo"+(photoHolder.childElementCount-1));
    let size = parseInt(window.getComputedStyle(ph).width);
    ph.style.width=(size/scaleFactor)+"px"
}

export default ButtonPlace