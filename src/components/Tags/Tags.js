import React from 'react';
import { Nav } from 'rsuite';


class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultSelected
    }
  }

  onSelect = (newValue) => {
    let tags = [...this.state.selected];
    let tagIndex = tags.indexOf(newValue);
    if (tagIndex >= 0 && tags.length === 1) {
      tags.splice(tagIndex, 1);
    } else if (tagIndex >= 0) {
      tags = [newValue];
    } else {
      tags.push(newValue);
    }
    this.setState({ selected: tags });
    if (this.props.onChange instanceof Function) this.props.onChange(tags)
  }

  render() {
    const { list } = this.props;
    const { selected } = this.state;
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

    return <Nav className="tags" appearance="subtle" onSelect={this.onSelect}>
      {blocks}
    </Nav>
  }
}
export default Tags;