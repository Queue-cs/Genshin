import React from 'react';
import { FlexboxGrid } from 'rsuite';

import '../css/icons.css';

const ItemIcon = ({ itemData, count, size, className, onClick }) => {
  size = size || "24px";
  className += " icon";
  const style = {
    width: "auto",
    height: "auto",
    maxWidth: size,
    maxHeight: size
  }
  return <FlexboxGrid.Item className="itemWrapper">
    <div className="item">
      <img
        src={itemData.images.fandom}
        style={style}
        className={className}
        title={itemData.name}
        alt={itemData.name}
        onClick={onClick}
      />
      <div className="itemCount">
        {count}
      </div>
    </div>
  </FlexboxGrid.Item>

}

export default ItemIcon;