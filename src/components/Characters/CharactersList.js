import React from 'react';
import { InputGroup, Input, Icon, FlexboxGrid } from 'rsuite';

import Tags from '../Tags';
import ImgIcon from '../Icon';
import Utils from '../../Utils';


const visionList = {
  "Anemo": (active) => <ImgIcon src="element anemo" size="48" className={active ? "enabled" : "disabled"} />,
  "Cryo": (active) => <ImgIcon src="element cryo" size="48" className={active ? "enabled" : "disabled"} />,
  // "dendro": <ImgIcon src="element dendro" size="48" />,
  "Electro": (active) => <ImgIcon src="element electro" size="48" className={active ? "enabled" : "disabled"} />,
  "Geo": (active) => <ImgIcon src="element geo" size="48" className={active ? "enabled" : "disabled"} />,
  "Hydro": (active) => <ImgIcon src="element hydro" size="48" className={active ? "enabled" : "disabled"} />,
  "Pyro": (active) => <ImgIcon src="element pyro" size="48" className={active ? "enabled" : "disabled"} />
}

const weaponList = {
  "Sword": (active) => <ImgIcon src="wtype sword" size="48" className={active ? "enabled" : "disabled"} />,
  "Claymore": (active) => <ImgIcon src="wtype claymore" size="48" className={active ? "enabled" : "disabled"} />,
  "Polearm": (active) => <ImgIcon src="wtype polearm" size="48" className={active ? "enabled" : "disabled"} />,
  "Bow": (active) => <ImgIcon src="wtype bow" size="48" className={active ? "enabled" : "disabled"} />,
  "Catalyst": (active) => <ImgIcon src="wtype catalyst" size="48" className={active ? "enabled" : "disabled"} />,
}

const rarityList = {
  "4": "4-Star",
  "5": "5-Star"
}


class CharactersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visions: ["Anemo", "Cryo", "Electro", "Geo", "Hydro", "Pyro"],
      weapons: ["Sword", "Claymore", "Polearm", "Bow", "Catalyst"],
      rarity: ["4", "5"],
      search: ""
    }

  }
  onSearch = (search) => {
    this.setState({ search });
  }
  setTags = (prop, newValue) => {
    let tags = [...this.state[prop]];
    let tagIndex = tags.indexOf(newValue);
    if (tagIndex >= 0 && tags.length === 1) {
      tags.splice(tagIndex, 1);
    } else if (tagIndex >= 0) {
      tags = [newValue];
    } else {
      tags.push(newValue);
    }
    this.setState({ [prop]: tags });
  }
  setVisions = (vision) => {
    this.setTags("visions", vision);
  }
  setWeapons = (weapon) => {
    this.setTags("weapons", weapon);
  }
  setRarity = (rarity) => {
    this.setTags("rarity", rarity);
  }
  charaRender = (key, data) => {
    const { onClick, history } = this.props;
    const clicked = () => {
      if (typeof onClick === 'function') {
        onClick(data.name);
      }
      this.setState({ showList: false });
      Utils.Redirect(history, '/characters/' + key, true);
    }
    const { rarity, weapontype, element, talentName, costs } = data;
    // TODO: show mats?
    // const allCosts = {
    //   ...costs,
    //   ...GenshinDB.talents(talentName).costs
    // };
    // let lvlMats = {};
    // for (const cKey in allCosts) {
    //   for (let i = 0; i < allCosts[cKey].length; i++) {
    //     const item = GenshinDB.materials(allCosts[cKey][i].name);
    //     let mType = item.materialtype.replace(/\(.*\)\s*/, "").trim();
    //     if (["Character Level-Up Material", "Talent Level-Up Material"].includes(mType)) {
    //       lvlMats[item.name] = item;
    //     }
    //   }
    // }

    const className = "itemWrapper character rarity" + rarity;
    let stars = [];
    for (let i = 0; i < rarity; i++) {
      stars.push(<Icon key={"star" + i} icon="star" />)
    }
    return <FlexboxGrid.Item key={"character_" + key} className={className} onClick={clicked}>
      <div className="item">
        <div className="header">
          {data.talentName}
        </div>
        <div className="header rarity">
          {stars}
        </div>
        <ImgIcon src={data.images.icon} img size="124" height="124px" />
        <FlexboxGrid className="header">
          <FlexboxGrid.Item colspan={12}>
            <ImgIcon src={"element " + element.toLowerCase()} size="32" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <ImgIcon src={"wtype " + weapontype.toLowerCase()} size="32" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </FlexboxGrid.Item>
  }
  render() {
    const { charactersDB } = this.props;
    const { visions, weapons, rarity, search } = this.state;
    let blocks = [];
    let rendered = [];
    for (const charaName in charactersDB) {
      const data = charactersDB[charaName];
      if (!data.talentName.toLowerCase().includes(search.toLowerCase())) continue;
      if (rarity.length > 0 && !rarity.includes(data.rarity)) continue;
      if (visions.length > 0 && !visions.includes(data.element)) continue;
      if (weapons.length > 0 && !weapons.includes(data.weapontype)) continue;
      blocks.push(this.charaRender(charaName, data));
      rendered.push(charaName);
    }
    return <React.Fragment>
      <Tags
        list={visionList}
        selected={visions}
        onSelect={this.setVisions}
      />
      <FlexboxGrid.Item colspan={24} />
      <Tags
        list={weaponList}
        selected={weapons}
        onSelect={this.setWeapons}
      />
      <FlexboxGrid.Item colspan={24} />
      <Tags
        list={rarityList}
        selected={rarity}
        onSelect={this.setRarity}
      />
      <FlexboxGrid.Item colspan={24} >
        <InputGroup className="search">
          <Input value={search} onChange={this.onSearch} />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
      </FlexboxGrid.Item>
      {blocks}
    </React.Fragment>
  }
}

export default CharactersList;