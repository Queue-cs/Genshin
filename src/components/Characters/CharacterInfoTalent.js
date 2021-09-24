import { FlexboxGrid, Table } from 'rsuite';

import ImgIcon from '../Icon';
import Utils from '../../Utils';

const { Column, HeaderCell, Cell } = Table;

const CharacterInfoTalent = ({ talentData, image }) => {
  let tableData = [];
  for (let i = 0; i < talentData.attributes.labels.length; i++) {
    const label = talentData.attributes.labels[i];
    // const rgx = label.match(/([^\|]+)\|{(param[0-9]+)\:([^\}]+)}([^\{]*)(?:{(param[0-9]+)\:([^\}]+)})?/i);
    const rgx = label.match(/([^\|]+)\|{(param[0-9]+):([^\}]+)}([^\{]*)(?:{(param[0-9]+):([^\}]+)})?/i);
    const param = talentData.attributes.parameters[rgx[2]];
    let attrData = {
      name: rgx[1]
    };
    for (let j = 0; j < param.length; j++) {
      attrData["lvl" + (j + 1)] = Utils.Format(param[j], rgx[3]) + rgx[4];
    }
    if (rgx[5]) {
      const param2 = talentData.attributes.parameters[rgx[5]];
      for (let j = 0; j < param2.length; j++) {
        attrData["lvl" + (j + 1)] += " " + Utils.Format(param2[j], rgx[3]);
      }
    }
    tableData.push(attrData);
  }
  let cols = [];
  for (let i = 1; i <= 15; i++) {
    cols.push(<Column width={80} key={talentData.name + "header" + i}>
      <HeaderCell>Lvl {i}</HeaderCell>
      <Cell dataKey={"lvl" + i} />
    </Column>)
  }
  return <FlexboxGrid className="talents" >
    <FlexboxGrid.Item className="name" colspan={24}>
      <h3>{talentData.name}</h3>
    </FlexboxGrid.Item>

    <FlexboxGrid className="desc">
      <FlexboxGrid.Item className="alignSelfCenter paddedSides">
        <ImgIcon src={image} img size="75" />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="flex1">
        {Utils.Markdown(talentData.info)}
      </FlexboxGrid.Item>
    </FlexboxGrid>


    <FlexboxGrid.Item className="tabel" colspan={24}>
      <Table
        data={tableData}
        autoHeight
        wordWrap
      >
        <Column minWidth={120} fixed flexGrow={1}>
          <HeaderCell></HeaderCell>
          <Cell dataKey="name" />
        </Column>
        {cols}
      </Table>
    </FlexboxGrid.Item>
  </FlexboxGrid>
}

export default CharacterInfoTalent;