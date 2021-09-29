import { FlexboxGrid, Col } from 'rsuite';
import Utils from '../../Utils';

const WeaponInfoHeader = ({ data }) => {
  const displayData = {
    "Weapon Type": data.weapontype,
    "Rarity": data.rarity,
    "Base Attack": data.baseatk,
    "Secondary Stat": data.substat,
    "Passive Name": data.effectname,
    "Passive": Utils.Markdown(Utils.StringFormat(data.effect, data.r1)),
    "Description": data.description,
    "Fandom": data.url.fandom ? <a key="url" href={data.url.fandom} >{data.url.fandom}</a> : ""
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
        <FlexboxGrid.Item className="title" colspan={10}>{key}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="value" colspan={14}>{value}</FlexboxGrid.Item>
      </FlexboxGrid>
    )
    i++;
  }

  return <FlexboxGrid className="infoHeader">
    <FlexboxGrid.Item componentClass={Col}>
      <img
        src={data.images.icon}
        alt={data.name}
        className="characterCover"
        style={{
          width: "100%",
          maxWidth: "100%"
        }}
      />
    </FlexboxGrid.Item>

    <FlexboxGrid.Item componentClass={Col} className="flex1">
      {rows}
    </FlexboxGrid.Item>

  </FlexboxGrid>
}

export default WeaponInfoHeader;