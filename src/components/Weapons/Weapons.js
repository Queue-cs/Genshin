import React from 'react';
import { Content, FlexboxGrid } from 'rsuite';

import genshindb from 'genshin-db';
import WeaponsList from './WeaponsList';
import WeaponInfo from './WeaponInfo';

const Weapons = class extends React.PureComponent {
  constructor(props) {
    super(props);
    const allWeapons = genshindb.weapons('names', { matchCategories: true });
    this.sortedDB = {
      "Sword": [],
      "Claymore": [],
      "Polearm": [],
      "Bow": [],
      "Catalyst": []
    };
    this.flatDB = {};
    for (let i = 0; i < allWeapons.length; i++) {
      const wepName = allWeapons[i];
      const wepKey = wepName.replace(/[\s]+/g, "_").replace(/[\(\)]+/g, "")
      const data = genshindb.weapons(wepName);
      this.sortedDB[data.weapontype].push({ ...data, wepKey });
      this.sortedDB[data.weapontype].sort((a, b) => {
        return a.rarity - b.rarity
      });
    }
    for (const key in this.sortedDB) {
      for (let i = 0; i < this.sortedDB[key].length; i++) {
        const element = this.sortedDB[key][i];
        this.flatDB[element.wepKey] = element;
      }
    }
  }
  render() {
    const {
      match, history
    } = this.props;
    const data = this.flatDB[match.params.weaponID];
    return <Content className="content weapons">
      <FlexboxGrid justify="center">
        {
          data ? <WeaponInfo data={data} />
            : <WeaponsList weaponsDB={this.sortedDB} history={history} />
        }
      </FlexboxGrid>
    </Content>

  }
}

export default Weapons;