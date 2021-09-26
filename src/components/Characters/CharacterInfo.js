import CharacterInfoHeader from './CharacterInfoHeader';
import CharacterInfoStats from './CharacterInfoStats';
import CharacterInfoTalent from './CharacterInfoTalent';
import CharacterInfoPassive from './CharacterInfoPassive';
import CharacterInfoConstellations from './CharacterInfoConstellations';
import CharacterInfoAscCost from './CharacterInfoAscCosts';
import CharacterInfoTalentCost from './CharacterinfoTalentCosts';

import genshindb from 'genshin-db';

const CharacterInfo = ({ data }) => {
  const name = data.talentName;
  const talents = genshindb.talents(name);
  const constellations = genshindb.constellations(name);
  let passives = [];
  for (const talent in talents) {
    if (talent.includes("passive")) {
      passives.push(
        <CharacterInfoPassive
          key={"passive" + talent}
          passiveData={talents[talent]}
          image={talents.images[talent]}
        />)
    }
  }
  return <div className="characterInfo">
    <h1>{name}</h1>
    <CharacterInfoHeader data={data} />
    <CharacterInfoStats data={data} />
    <CharacterInfoAscCost costs={data.costs} />
    <h1>Talents</h1>
    <CharacterInfoTalent talentData={talents.combat1} image={talents.images.combat1} />
    <CharacterInfoTalent talentData={talents.combat2} image={talents.images.combat2} />
    <CharacterInfoTalent talentData={talents.combat3} image={talents.images.combat3} />
    <CharacterInfoTalentCost costs={talents.costs} />
    <h1>Passives</h1>
    {passives}
    <CharacterInfoConstellations constellationData={constellations} />
  </div>
}

export default CharacterInfo;