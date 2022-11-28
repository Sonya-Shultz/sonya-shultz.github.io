import React from "react";

class GoodsCard extends React.Component {

render() {
    return (
        <div className={this.props.bk}>
            <img className="prodImg" src={this.props.imgUrl} alt={this.props.altName}/>
            <p className="prodName">{this.props.name}</p>
            <p className="prodPrice">{this.props.price}</p>
        </div>
    )}
}

export default GoodsCard
    