import React from "react";
import GoodsCard from "../components/part2/GoodsCard";
import "./SecPage.css"

let names=["Яблука", "Мандарини", "Шинка", "Хліб", "Молоко", "Чай пакетований (100 шт)", "Екскалібур", "Вино", "Сир"];
let price=["15.50 грн/кг","75.20 грн/кг","203.70 грн/кг","7.25 грн","37.60 грн/л","103 грн","ЗАБЕРІТЬ ЙОГО ВІД НАС (ми доплатимо)","198.40 грн/л","207.59 грн/кг"];
let alt_d=["Зелені ябулка","Малі безкісточкові мандарини","Шинка нарізна","Батон білий","Молоко домашнє","Чай чорний покетований","ДУРНІ!","Вино червоне напівсухе","Сир голландський"];
let img=["https://nicliquid.com/168-large_default/green-apple-flavor-concentrate.jpg"
,"https://m.dom-eda.com/uploads/images/catalog/item/53275a4f46/c4f7252f9e_1000.jpg"
,"http://cdn.vkusnoo.com.ua/images/17261/17261-vetchina-600x465.png"
,"https://hlibinvest.com.ua/wp-content/uploads/2018/06/baton-fajnij.jpg"
,"https://gogoliv.com/wp-content/uploads/2020/05/koziache-moloko-domashnie-hoholiv.jpg"
,"https://content2.rozetka.com.ua/goods/images/big/10750025.jpg"
,"https://preview.redd.it/v8iqk21afpa71.png?width=860&format=png&auto=webp&s=37ebb953c9afd2d23c7723bd25494fb51f0302b6"
,"https://kolonist.com.ua/upload/resize_cache/iblock/c56/620_700_1/Krynychnoe-krasnoe-2018.jpg"
,"https://www.ryboedy.com.ua/wp-content/uploads/2021/04/%D0%B3%D0%BE%D0%BB%D0%BB%D0%B0%D0%BD%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%D0%A1%D1%8B%D1%80.jpg"];

function SecPart() {
    let i=0;
  return (
    <div className="SecPart">
    {names.map(function(object){
        i++;
        let j=i-1;
        let c="prodHolder";
        if (i%2===1) c="prodHolderSec"
        return <GoodsCard name={names[j]} price={price[j]} altName={alt_d[j]} imgUrl={img[j]} key={j} bk={c} />;
    })}
    </div>
  );
}

export default SecPart;