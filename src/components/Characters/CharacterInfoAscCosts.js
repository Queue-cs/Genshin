import { FlexboxGrid } from 'rsuite';

import ItemIcon from '../ItemIcon';

import genshindb from 'genshin-db';

const CharacterInfoAscCost = ({ costs }) => {
  let rows = [];
  let ascI = 0;

  for (const key in costs) {
    const isOdd = ++ascI % 2 === 1;
    const rowName = "tableRows " + (isOdd ? "odd" : "even");
    let sort = {};
    for (let j = 0; j < costs[key].length; j++) {
      const item = genshindb.materials(costs[key][j].name);
      const mType = item.materialtype.replace(/\(.*\)\s*/, "").trim();
      sort[mType] = sort[mType] || [];
      sort[mType].push({
        count: costs[key][j].count,
        ...item
      });
    }
    const render = (entry) => {
      let boxes = [];
      for (let k = 0; k < entry.length; k++) {
        const element = entry[k];
        boxes.push(
          <ItemIcon
            key={"material" + key + element.name}
            itemData={element}
            count={element.count}
            size="48px"
          />
        );
      }
      return <FlexboxGrid justify="center">{boxes}</FlexboxGrid>;
    }
    rows.push(
      <FlexboxGrid align="middle" className={rowName} key={"ascCost" + key}>
        <FlexboxGrid.Item colspan={5}>{ascI - 1} &gt; {ascI}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={5}>{sort["Common Currency"][0].count}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={9}>{render(sort["Character Level-Up Material"])}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={5}>{render(sort["Local Specialty"])}</FlexboxGrid.Item>
      </FlexboxGrid>
    )

  }
  return <div className="ascCosts" >
    <h2>Ascension Costs</h2>
    <FlexboxGrid align="middle" className="tableRows header">
      <FlexboxGrid.Item colspan={5}>Ascension</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>Mora</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={9}>Character Acension Materials</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>Local Specialties</FlexboxGrid.Item>
    </FlexboxGrid>
    {rows}
  </div>
}

export default CharacterInfoAscCost;