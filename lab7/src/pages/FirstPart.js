import "./FirstPage.css"

import {Header} from '../components/part1/Header';
import Content from '../components/part1/Content';
import ImageMain from '../components/part1/ImageMain';
import HeaderPart2 from '../components/part1/HeaderP2';
import PhotoHolder from '../components/part1/PhotoHolder';
import ButtonPlace from '../components/part1/ButtonPlace';

function FirstPart() {
  return (
    <div className="FirstPart">
      <Header/>
      <Content/>
      <ImageMain/>
      <HeaderPart2/>
      <PhotoHolder/>
      <ButtonPlace/>
    </div>
  );
}

export default FirstPart;