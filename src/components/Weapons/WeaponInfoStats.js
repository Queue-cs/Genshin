import { FlexboxGrid } from 'rsuite';
import Utils from '../../Utils';
import ItemIcon from '../ItemIcon';
import genshindb from 'genshin-db';

const lvls = [
  [1, "-"], [5, "-"], [10, "-"], [15, "-"], [20, "-"],
  [20, "+"], [25, "-"], [30, "-"], [35, "-"], [40, "-"],
  [40, "+"], [45, "-"], [50, "-"],
  [50, "+"], [55, "-"], [60, "-"],
  [60, "+"], [65, "-"], [70, "-"],
  [70, "+"], [75, "-"], [80, "-"],
  [80, "+"], [85, "-"], [90, "-"]
]

const WeaponInfoStats = ({ data }) => {
  const { stats, substat, costs } = data;
  let rows = [];
  let ascRows = {};
  for (let i = 0; i < lvls.length; i++) {
    const element = lvls[i];
    const value = stats(...element);
    if (!value) break;
    ascRows[value.ascension] = ascRows[value.ascension] || [];
    ascRows[value.ascension].push(
      <FlexboxGrid className="inner row " align="middle" key={"statRow" + i}>
        <FlexboxGrid.Item className="flex1">
          {element[0]}{element[1] !== "-" ? "+" : ""}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">
          {Math.round(value.attack)}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="flex1">
          {Utils.FormatWSub(value.specialized, substat)}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
  let i = 0;
  for (const ascKey in ascRows) {
    if (Object.hasOwnProperty.call(ascRows, ascKey)) {
      const inner = ascRows[ascKey];
      const costInner = [];
      const cost = costs["ascend" + i];
      if (cost) {
        for (const costKey in cost) {
          if (Object.hasOwnProperty.call(cost, costKey)) {
            const costE = cost[costKey];
            costInner.push(
              <ItemIcon
                key={"costKey-" + ascKey + costKey}
                itemData={genshindb.materials(costE.name)}
                count={costE.count}
                size="48px"
              />
            );
          }
        }
      }
      const isOdd = ++i % 2 === 1;
      const rowName = "stretchCenterFlex tableRows " + (isOdd ? "odd" : "even");
      rows.push(
        <FlexboxGrid className={rowName} align="middle" key={"ascRow" + ascKey}>
          <FlexboxGrid.Item colspan={4}>
            {ascKey}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            {inner}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <FlexboxGrid justify="center">
              {costInner}
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      )
    }
  }
  return <div className="stats">
    <h2>Base Stats</h2>
    <FlexboxGrid align="middle" className="tableRows header">
      <FlexboxGrid.Item colspan={4}>Ascension</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Level</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>Base Atk</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>{substat}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8} >Ascension Costs</FlexboxGrid.Item>
    </FlexboxGrid>
    {rows}
  </div>
}

export default WeaponInfoStats;