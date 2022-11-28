import React from "react";

function Header(){
    return(
        <h2 id="first_el" className="f_class" onClick={change}>Шульц Софія Олексіївна</h2>
    )
}

function swapClass(f, s, type_name){
    const arr_elems = [f, s];
    arr_elems.forEach(el => {
        if (el.className === "s_class"){
            el.className = "f_class";
        }
        else {
            el.className = "s_class";
        }
    })
    console.log("by "+type_name);
}

function change(e){
    var s_el = document.getElementById("sec_el");
    var f_el = e.target;
    swapClass(f_el,s_el,"ID");
}

export {Header,swapClass}