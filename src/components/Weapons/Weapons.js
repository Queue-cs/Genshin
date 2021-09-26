import React from 'react';
import { Content, FlexboxGrid } from 'rsuite';

import genshindb from 'genshin-db';
import WeaponsList from './WeaponsList';

console.log(genshindb.weapons('Dull Blade'));

const Weapons = class extends React.PureComponent {
  constructor(props) {
    super(props);
    const allWeapons = genshindb.weapons('names', { matchCategories: true });
    let sortedDB = {
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
      sortedDB[data.weapontype].push({ ...data, wepKey });
      sortedDB[data.weapontype].sort((a, b) => {
        return a.rarity - b.rarity
      });
    }
    for (const key in sortedDB) {
      for (let i = 0; i < sortedDB[key].length; i++) {
        const element = sortedDB[key][i];
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
        {/* {
          data ? <CharacterInfo data={data} />
            : <CharactersList charactersDB={charactersDB} history={history} />
        } */}
        <WeaponsList weaponsDB={this.flatDB} history={history} />
      </FlexboxGrid>
    </Content>

  }
}

export default Weapons;