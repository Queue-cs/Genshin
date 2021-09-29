import { FlexboxGrid, Col } from 'rsuite';
import Utils from '../../Utils';

const CharacterInfoHeader = ({ data }) => {
  const displayData = {
    "Rarity": data.rarity,
    "Element": data.element,
    "Weapon Type": data.weapontype,
    "Gender": data.gender,
    "Body Type": data.body,
    "Birthday": data.birthday,
    "Region": data.region,
    "Affiliation": data.affiliation,
    "Constellation": data.constellation,
    "CV": data.cv,
    "Fandom": data.url.fandom ? <a href={data.url.fandom} >{data.url.fandom}</a> : ""
  };
  let rows = [];
  let i = 0;
  for (const key in displayData) {
    let value = displayData[key];
    const isOdd = i % 2 === 1;
    if (Utils.isPlainObject(value)) {
      let tempValue = [];
      for (const key2 in value) {
        if (Object.hasOwnProperty.call(value, key2)) {
          tempValue.push(<p key={key + ":" + key2}>
            <b>{key2}</b>: {value[key2]}
          </p>)
        }
      }
      value = tempValue;
    }
    rows.push(
      <FlexboxGrid className={"tableRows " + (isOdd ? "odd" : "even")} key={"dataDisplay-" + key}>
        <FlexboxGrid.Item colspan={10}>{key}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={14}>{value}</FlexboxGrid.Item>
      </FlexboxGrid>
    )
    i++;
  }

  return <FlexboxGrid className="infoHeader">
    <FlexboxGrid.Item componentClass={Col} colspan={24} mdHidden lgHidden>
      <img
        src={data.images.cover1}
        alt={data.talentName}
        className="characterCover"
        style={{
          width: "100%",
          maxWidth: "100%"
        }}
      />
    </FlexboxGrid.Item>

    <FlexboxGrid.Item componentClass={Col} colspan={10} md={10} sm={24} xs={24}>
      {rows}
    </FlexboxGrid.Item>

    <FlexboxGrid.Item componentClass={Col} colspan={14} md={14} xsHidden smHidden>
      <img
        src={data.images.cover1}
        alt={data.talentName}
        className="characterCover"
        style={{
          width: "100%",
          maxWidth: "100%"
        }}
      />
    </FlexboxGrid.Item>
  </FlexboxGrid>
}

export default CharacterInfoHeader;