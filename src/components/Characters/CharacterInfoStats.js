import { FlexboxGrid } from 'rsuite';

import Utils from '../../Utils';

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
  let rows = [];
  let ascRows = {};
  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    const stats = data.stats(element[0], element[1]);
    ascRows[stats.ascension] = ascRows[stats.ascension] || [];
    ascRows[stats.ascension].push(stats)
  }
  let asc = 0;
  for (const key in ascRows) {
    const stats = ascRows[key];
    let inner = [];
    for (let j = 0; j < stats.length; j++) {
      const stat = stats[j];
      inner.push(<FlexboxGrid className="row" key={"ascstats" + j}>
        <FlexboxGrid.Item className="flex1">{Utils.FormatNumber(stat.level)}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">{Utils.FormatNumber(stat.hp)}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">{Utils.FormatNumber(stat.attack)}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">{Utils.FormatNumber(stat.defense)}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">{Utils.FormatNumber(stat.specialized)} %</FlexboxGrid.Item>
      </FlexboxGrid>)
    }
    const isOdd = ++asc % 2 === 1;
    const rowName = "tableRows " + (isOdd ? "odd" : "even");
    rows.push(<FlexboxGrid className={rowName} align="middle" key={"ascRow" + asc}>
      <FlexboxGrid.Item colspan={4}>{asc}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={20}>
        {inner}
      </FlexboxGrid.Item>
    </FlexboxGrid>)
  }

  return <div className="stats">
    <h2>Base Stats</h2>
    <FlexboxGrid align="middle" className="tableRows header">
      <FlexboxGrid.Item colspan={4}>Ascension</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Level</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Base HP</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Base Attack</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Base Defense</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>{data.substat} %</FlexboxGrid.Item>
    </FlexboxGrid>
    {rows}
  </div>
}

export default CharacterInfoStats;