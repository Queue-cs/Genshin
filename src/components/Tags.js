import React from 'react';
import { Nav } from 'rsuite';


const Tags = ({ list, selected, onSelect }) => {
  let blocks = [];
  for (const key in list) {
    let isActive = true;
    if (Array.isArray(selected)) {
      isActive = selected.length === 0 || selected.indexOf(key) >= 0;
    } else {
      isActive = key === selected;
    }
    blocks.push(
      <Nav.Item eventKey={key} key={"TAGS." + key} className="tags" active={isActive}>
        {list[key] instanceof Function ? list[key](isActive) : list[key]}
      </Nav.Item>
    )
  }

  return <Nav className="tags" appearance="subtle" onSelect={onSelect}>
    {blocks}
  </Nav>
}

export default Tags;