import React from 'react';
import { InputGroup, Input, Icon, FlexboxGrid } from 'rsuite';

import genshindb from 'genshin-db'

import ImgIcon from '../Icon';
import VisionTags from '../Tags/VisionTags';
import WeaponTags from '../Tags/WeaponTags';
import CharacterRarityTags from '../Tags/CharacterRarityTags';
import { Link } from 'react-router-dom';
import Utils from '../../Utils';

class CharactersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visions: [],
      weapons: [],
      rarity: [],
      search: ""
    }

  }
  onSearch = (search) => {
    this.setState({ search });
  }
  setVisions = (newTags) => {
    this.setState({ "visions": newTags });
  }
  setWeapons = (newTags) => {
    this.setState({ "weapons": newTags });
  }
  setRarity = (newTags) => {
    this.setState({ "rarity": newTags });
  }
  charaRender = (key, data) => {
    const { rarity, weapontype, element, talentName, costs } = data;
    const allCosts = {
      ...costs,
      ...genshindb.talents(talentName).costs
    };
    let lvlMats = {};
    for (const cKey in allCosts) {
      for (let i = 0; i < allCosts[cKey].length; i++) {
        const item = genshindb.materials(allCosts[cKey][i].name);
        let mType = item.materialtype.replace(/\(.*\)\s*/, "").trim();
        if (["Character Level-Up Material", "Talent Level-Up Material"].includes(mType)) {
          lvlMats[item.name] = item;
        }
      }
    }
    let lvlMatsSorted = Object.values(lvlMats).sort((a, b) => a.sortorder - b.sortorder);
    let prev;
    for (let i = lvlMatsSorted.length - 1; i >= 0; i--) {
      let current = lvlMatsSorted[i];
      if (prev && Utils.SimilarMaterial(current, prev)) {
        lvlMatsSorted.splice(i, 1);
      }
      prev = current;
    }
    let mats = [];
    for (let i = 0; i < lvlMatsSorted.length; i++) {
      const mat = lvlMatsSorted[i];
      mats.push(<a href={mat.url.fandom} target="_blank" rel="noreferrer" key={"lvlmaterial-" + i}>
        <img
          src={mat.images.fandom}
          style={{ maxWidth: "32px" }}
          alt={mat.name}
        />
      </a>);
    }

    const className = "itemWrapper character rarity" + rarity;
    const style = {
      width: "124px"
    }
    let stars = [];
    for (let i = 0; i < rarity; i++) {
      stars.push(<Icon key={"star" + i} icon="star" />)
    }
    return <FlexboxGrid.Item key={"character_" + key} className={className} style={style}>
      <div className="item">
        <div className="header">
          <Link to={"characters/" + key}>
            {data.talentName}
          </Link>
        </div>
        <div className="header rarity">
          {stars}
        </div>
        <Link to={"characters/" + key}>
          <ImgIcon src={data.images.icon} img size="124" height="124px" />
        </Link>

        <FlexboxGrid className="header">
          <FlexboxGrid.Item colspan={12}>
            <ImgIcon src={"element " + element.toLowerCase()} size="32" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <ImgIcon src={"wtype " + weapontype.toLowerCase()} size="32" />
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <FlexboxGrid className="header">
          <FlexboxGrid.Item colspan={24}>
            {mats}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </FlexboxGrid.Item>
  }
  render() {
    const { charactersDB } = this.props;
    const { visions, weapons, rarity, search } = this.state;
    let blocks = [];
    for (const charaName in charactersDB) {
      const data = charactersDB[charaName];
      if (!data.talentName.toLowerCase().includes(search.toLowerCase())) continue;
      if (rarity.length > 0 && !rarity.includes(data.rarity)) continue;
      if (visions.length > 0 && !visions.includes(data.element)) continue;
      if (weapons.length > 0 && !weapons.includes(data.weapontype)) continue;
      blocks.push(this.charaRender(charaName, data));
    }
    return <React.Fragment>
      <VisionTags
        defaultSelected={visions}
        onChange={this.setVisions}
      />
      <FlexboxGrid.Item colspan={24} />
      <WeaponTags
        defaultSelected={weapons}
        onChange={this.setWeapons}
      />
      <FlexboxGrid.Item colspan={24} />
      <CharacterRarityTags
        defaultSelected={rarity}
        onChange={this.setRarity}
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