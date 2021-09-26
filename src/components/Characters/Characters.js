import React from 'react';
import { observer } from 'mobx-react';
import { Content, FlexboxGrid } from 'rsuite';

import CharactersList from './CharactersList';
import CharacterInfo from './CharacterInfo';

import genshindb from 'genshin-db';

let charactersDB = {};
const allCharas = genshindb.talents('names', { matchCategories: true });
for (let i = 0; i < allCharas.length; i++) {
  const name = allCharas[i];
  const key = name.replace(/[\s]+/g, "_").replace(/[\(\)]+/g, "");
  if (name.includes("Traveler")) {
    charactersDB[key] = {
      ...genshindb.characters("Aether"),
      element: name.match(/\((.*)\)/)[1]
    };
  } else {
    charactersDB[key] = { ...genshindb.characters(name) };
  }
  charactersDB[key].talentName = name;
}

let imageCount = {
  card: [],
  cover1: [],
  cover2: [],
  "hoyolab-avatar": [],
  image: [],
  portrait: []
};
for (const key in charactersDB) {
  const element = charactersDB[key];
  for (const iKey in imageCount) {
    if (!element.images.hasOwnProperty(iKey)) {
      imageCount[iKey].push(key);
    }
  }
}

const Characters = observer(class extends React.PureComponent {
  render() {
    const {
      match, history
    } = this.props;
    const data = charactersDB[match.params.characterID];
    return <Content className="content">
      <FlexboxGrid justify="center">
        {
          data ? <CharacterInfo data={data} />
            : <CharactersList charactersDB={charactersDB} history={history} />
        }

      </FlexboxGrid>
    </Content>

  }
})

export default Characters;