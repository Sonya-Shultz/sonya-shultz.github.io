import "./Choose.css";
import React from 'react' 
import { Outlet, Link, useLocation } from "react-router-dom";

function changeSize() {
    let x = 1, y=1;
    let cx="rgb(166, 223, 166)" , cy="rgb(166, 223, 166)";
    let bx="5px solid rgb(166, 223, 166)" ,by="5px solid rgb(166, 223, 166)";
    if(document.URL.endsWith("task1")){
        x=3;cx="rgb(127, 186, 127)";bx="5px solid rgb(127, 186, 127)";
    }
    else if(document.URL.endsWith("task2")){
        y=3;cy="rgb(127, 186, 127)";by="5px solid rgb(127, 186, 127)";
    }
    let flink = document.getElementById("flink");
    flink.style.flex=x;
    flink.style.backgroundColor=cx;
    flink.style.border=bx;
    let slink = document.getElementById("slink");
    slink.style.flex=y;
    slink.style.backgroundColor=cy;
    slink.style.border=by;
};

function fun1(e){
    let el;
    if(e.target.id==="flink" || e.target.id==="slink")
        el=e.target;
    else 
        el = e.target.parentElement;
    if(el.style.backgroundColo==="rgb(127, 186, 127)")
        el.style.backgroundColor="rgba(127, 186, 127, 0.5)";
    else el.style.backgroundColor="rgba(166, 223, 166, 0.5)";
}
function fun2(e){
    changeSize();
}

const Choose = () => {
    const location = useLocation() 
    React.useEffect(() => {
        changeSize();
    }, [location]);

    let ele= (<div>
        <nav>
            <ul className="routerUl">
                <li id="flink" onMouseOver={fun1} onMouseLeave={fun2}>
                    <Link to="/task1" className="upperLink">ЗАВДАННЯ 1</Link>
                </li>
                <li id="slink" onMouseOver={fun1} onMouseLeave={fun2}>
                    <Link to="/task2" className="upperLink">ЗАВДАННЯ 2</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </div>);
  return ele;
};

export default Choose;