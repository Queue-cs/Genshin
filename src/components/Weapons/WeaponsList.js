import React from 'react';
import { InputGroup, Input, Icon, FlexboxGrid, Col } from 'rsuite';
import { Link } from 'react-router-dom';

import WeaponRarityTags from '../Tags/WeaponRarityTags';
import WeaponTags from '../Tags/WeaponTags';
import genshindb from 'genshin-db';

import Utils from '../../Utils';

class WeaponsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      weapons: [],
      rarity: [],
      search: "",
      rarityAsc: false,
      baseAsc: false
    }
  }
  componentDidMount() {
    this.updateSort();
  }
  updateSort = () => {
    // TODO: merge tag sorting into here
    const { weaponsDB } = this.props;
    const { rarityAsc, baseAsc } = this.state;
    let list = [];
    for (const key in weaponsDB) {
      if (Object.hasOwnProperty.call(weaponsDB, key)) {
        const wList = [...weaponsDB[key]].sort((a, b) => {
          let delta = 0;
          const deltaRarity = a.rarity - b.rarity;
          const lvl90a = a.stats(90) || a.stats(70);
          const lvl90b = b.stats(90) || b.stats(70);
          const deltaBase = lvl90a.attack - lvl90b.attack;
          delta = deltaRarity * (rarityAsc ? 1 : -1);
          if (delta === 0) {
            if (baseAsc) {
              delta = deltaBase;
            } else {
              delta = -deltaBase;
            }
          }
          return delta;
        });
        for (let i = 0; i < wList.length; i++) {
          list.push(wList[i]);
        }
      }
    }
    this.setState({ list });
  }
  onSearch = (search) => {
    this.setState({ search });
  }
  setWeapons = (newTags) => {
    this.setState({ "weapons": newTags });
  }
  setRarity = (newTags) => {
    this.setState({ "rarity": newTags });
  }
  weaponRender = (key, data) => {
    const { rarity, effect, effectname, stats, substat, subvalue, baseatk, r1, costs } = data;
    const className = "row weapon rarity" + rarity;
    let stars = [];
    for (let i = 0; i < rarity; i++) {
      stars.push(<Icon key={"star" + i} icon="star" />)
    }
    const lvl90 = stats(90) || stats(70);
    const baseAtk90 = Math.round(lvl90.attack) || "";
    const isPercent = substat !== "Elemental Mastery";
    const sub90 = Utils.FormatWSub(lvl90.specialized, substat);
    const subSuffix = isPercent ? "%" : "";
    const style = {
      width: "auto",
      height: "auto",
      maxWidth: "100%",
      maxHeight: "100%"
    }
    const lvlMats = Object.values(costs).slice(-1)[0];
    const mats = [];
    for (let i = 0; i < lvlMats.length; i++) {
      const mat = genshindb.materials(lvlMats[i].name);
      if (["Character Level-Up Material", "Weapon Ascension Material"].includes(mat.materialtype)) {
        mats.push(<a href={mat.url.fandom} target="_blank" rel="noreferrer" key={"lvlmaterial-" + i}>
          <img
            src={mat.images.fandom}
            style={{ maxWidth: "32px" }}
            alt={mat.name}
          />
        </a>)
      }
    }

    return <FlexboxGrid.Item key={"weapon_" + key} className={className} colspan={24}>
      <FlexboxGrid align="middle" className="container">
        <FlexboxGrid.Item colspan={3} style={{ maxWidth: "64px" }}>
          <Link to={'/weapons/' + key}>
            <img
              src={data.images.icon}
              style={style}
              title={data.name}
              alt={data.name}
            />
          </Link>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4} style={{ minWidth: "125px" }}>
          <Link to={'/weapons/' + key}>{data.name}</Link>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2}>
          {stars}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2} style={{ minWidth: "75px" }}>
          {baseatk} ({baseAtk90})
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2} style={{ minWidth: "75px" }}>
          {substat} {subvalue}{subSuffix} ({sub90})
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1" componentClass={Col} xsHidden smHidden>
          <span className="effectName">{effectname}</span>
          {Utils.Markdown(Utils.StringFormat(effect, r1) || "")}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1" style={{ maxWidth: "103px", width: "10%" }}>
          {mats}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </FlexboxGrid.Item>
  }
  toggleBaseAsc = () => {
    this.setState({
      baseAsc: !this.state.baseAsc
    }, this.updateSort)
  }
  toggleRarityAsc = () => {
    this.setState({
      rarityAsc: !this.state.rarityAsc
    }, this.updateSort)
  }
  render() {
    const { list, weapons, rarity, search, rarityAsc, baseAsc } = this.state;
    let blocks = [];
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (!data.name.toLowerCase().includes(search.toLowerCase())) continue;
      if (rarity.length > 0 && !rarity.includes(data.rarity)) continue;
      if (weapons.length > 0 && !weapons.includes(data.weapontype)) continue;
      blocks.push(this.weaponRender(data.wepKey, data));
    }
    return <React.Fragment>
      <WeaponTags
        defaultSelected={weapons}
        onChange={this.setWeapons}
      />
      <FlexboxGrid.Item colspan={24} />
      <WeaponRarityTags
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
      <FlexboxGrid.Item colspan={24} className="weaponList">
        <FlexboxGrid.Item colspan={24} className="row weapon header"  >
          <FlexboxGrid className="container" align="middle">
            <FlexboxGrid.Item colspan={3} style={{ maxWidth: "64px" }}>
              Icon
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4} style={{ minWidth: "125px" }}>
              Name
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2} className="pointer" onClick={this.toggleRarityAsc} >
              Rarity <Icon icon={rarityAsc ? "arrow-up-line" : "arrow-down-line"} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2} className="pointer" style={{ minWidth: "75px" }} onClick={this.toggleBaseAsc} >
              Base ATK (Max Lvl) <Icon icon={baseAsc ? "arrow-up-line" : "arrow-down-line"} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2} style={{ minWidth: "75px" }}>
              2nd Stat (Max Lvl)
            </FlexboxGrid.Item>
            <FlexboxGrid.Item className="flex1" componentClass={Col} xsHidden smHidden>
              Passive
            </FlexboxGrid.Item>
            <FlexboxGrid.Item className="flex1" style={{ maxWidth: "103px", width: "10%" }}>
              Materials
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        {blocks}
      </FlexboxGrid.Item>

    </React.Fragment>
  }
}

export default WeaponsList;