import { FlexboxGrid } from 'rsuite';

import Utils from '../../Utils';
import ImgIcon from '../Icon';

const CharacterInfoConstellations = ({ constellationData }) => {
  let rows = [];
  for (const con in constellationData) {
    if (!con.includes("c")) continue;
    const consData = constellationData[con];
    rows.push(<FlexboxGrid align="middle" className="constellation" key={con}>
      <FlexboxGrid.Item colspan={1}>
        <b>{con}</b>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="paddedSides">
        <ImgIcon src={constellationData.images[con]} img size="50" />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="flex1">
        <h3>{consData.name}</h3>
        {Utils.Markdown(consData.effect)}
      </FlexboxGrid.Item>
    </FlexboxGrid>)
  }
  return <FlexboxGrid className="constellations">
    <FlexboxGrid.Item colspan={24}>
      <h1>Constellations</h1>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={24}>
      {rows}
    </FlexboxGrid.Item>
  </FlexboxGrid>
}

export default CharacterInfoConstellations;