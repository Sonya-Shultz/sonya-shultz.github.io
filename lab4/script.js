var img_id=0;
var scaleFactor = 1.2;
var max_img=13;

window.onclick = function (event){
    if (event.target.id=='first_el'){
        s_el = document.getElementById("sec_el");
        f_el = event.target;
        change(f_el, s_el, "by ID");
    }
    else if (event.target.id=='sec_el'){
        f_el = document.querySelector("h2#first_el");
        s_el = event.target;
        change(f_el, s_el, "by QuerySelector");
    }
    else if (event.target.id=='addBtn'){
        if (img_id == max_img) alert("ОГО! Наклацано більше "+max_img+" картинок(и)... \n Але хто я така, щоб тебе зупиняти?! \n ¯\\\_( ͡❛ ▿ ͡❛)_/¯")
        photoHolder = document.getElementById("photoHolder");
        let ph = document.createElement('img');
        ph.src="https://picsum.photos/500/200?random="+Math.floor(Math.random() * 13131313);
        ph.className="new_img";
        ph.id = "photo"+img_id;
        img_id++;
        photoHolder.append(ph);
    }
    else if (event.target.id=='deleteBtn'){
        if (img_id > 0){
            photoHolder = document.getElementById("photoHolder");
            img_id--;
            ph = document.querySelector("img.new_img#photo"+img_id);
            ph.remove();
        } else {alert("Немає зображень для видалення!")}
    }
    else if (event.target.id=='biggerBtn'){
        photoHolder = document.getElementById("photoHolder");
        ph = document.querySelector("img.new_img#photo"+(img_id-1));
        size = parseInt(window.getComputedStyle(ph).width);
        ph.style.width=(size*scaleFactor)+"px"
    }
    else if (event.target.id=='smallerBtn'){
        photoHolder = document.getElementById("photoHolder");
        ph = document.querySelector("img.new_img#photo"+(img_id-1));
        size = parseInt(window.getComputedStyle(ph).width);
        ph.style.width=(size/scaleFactor)+"px"
    }
}

function change(f_elm, s_elm, type) {
    const arr_elems = [f_el, s_el];
    arr_elems.forEach(el => {
        if (el.classList.contains("s_class")){
            el.classList.remove("s_class");
            el.classList.add("f_class");
        }
        else {
            el.classList.add("s_class");
            el.classList.remove("f_class");
        }
    })
    console.log(type);
}