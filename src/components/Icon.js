import React from 'react';

import '../css/icons.css';

const ImgIcon = ({ src, size, height, className, onClick, img, alt }) => {
  size = Number(size) || 24;
  let style = {
    width: size + "px",
    height: size + "px"
  }
  // if (img) {
  //   style.backgroundImage = "url(" + src + ")";
  // }
  className = (className || "") + " icon ";
  if (onClick) className += " button";
  if (img) {
    style.height = height || "auto";
    return <img
      src={src}
      className={className}
      style={style}
      title={alt}
      alt={alt}
      onClick={onClick}
    />
  }
  return <i
    className={className + src}
    style={style}
    title={alt}
    onClick={onClick}
  />
}

export default ImgIcon;