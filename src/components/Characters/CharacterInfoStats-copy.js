import { Grid, Row, Col, Table } from 'rsuite';

import Utils from '../../Utils';

const { Column, HeaderCell, Cell } = Table;

const entries = [
  [1, null],
  [20, null], [20, "+"],
  [40, null], [40, "+"],
  [50, null], [50, "+"],
  [60, null], [60, "+"],
  [70, null], [70, "+"],
  [80, null], [80, "+"],
  [90, null]
]

const CharacterInfoStats = ({ data }) => {
  let tableData = [];
  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    const stats = data.stats(element[0], element[1]);
    tableData.push({
      level: Utils.FormatNumber(stats.level) + element[1],
      hp: Utils.FormatNumber(stats.hp),
      attack: Utils.FormatNumber(stats.attack),
      defense: Utils.FormatNumber(stats.defense),
      spec: Utils.FormatPercent(stats.specialized) + "%"
    });
  }
  return <Table
    data={tableData}
    autoHeight
    wordWrap
  >
    <Column minWidth={60} fixed flexGrow={1}>
      <HeaderCell>Level</HeaderCell>
      <Cell dataKey="level" />
    </Column>
    <Column minWidth={60} fixed flexGrow={1}>
      <HeaderCell>HP</HeaderCell>
      <Cell dataKey="hp" />
    </Column>
    <Column minWidth={60} fixed flexGrow={1}>
      <HeaderCell>Attack</HeaderCell>
      <Cell dataKey="attack" />
    </Column>
    <Column minWidth={60} fixed flexGrow={1}>
      <HeaderCell>Defense</HeaderCell>
      <Cell dataKey="defense" />
    </Column>
    <Column minWidth={60} fixed flexGrow={1}>
      <HeaderCell>{data.substat}</HeaderCell>
      <Cell dataKey="spec" />
    </Column>
  </Table>
}

export default CharacterInfoStats;