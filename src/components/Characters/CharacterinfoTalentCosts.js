import { FlexboxGrid } from 'rsuite';

import ItemIcon from '../ItemIcon';

import genshindb from 'genshin-db';

const CharacterInfoTalentCost = ({ costs }) => {
  console.log(costs);
  let rows = [];
  let ascI = 0;

  for (const key in costs) {
    const title = key.replace(/[^0-9](?=[0-9])/g, "$& ");
    const isOdd = ++ascI % 2 === 1;
    const rowName = "tableRows " + (isOdd ? "odd" : "even");
    let sort = {};
    for (let j = 0; j < costs[key].length; j++) {
      const item = genshindb.materials(costs[key][j].name);
      let mType = item.materialtype.replace(/\(.*\)\s*/, "").trim();
      if (mType !== "Common Currency") {
        mType = "Materials";
      }
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
            itemData={element}
            count={element.count}
            size="48px"
          />
        );
      }
      return <FlexboxGrid>{boxes}</FlexboxGrid>;
    }
    rows.push(
      <FlexboxGrid align="middle" className={rowName} key={"ascCost" + key}>
        <FlexboxGrid.Item colspan={5}>{title}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={5}>{sort["Common Currency"][0].count}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={10} className="flex1">{render(sort["Materials"])}</FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
  return <div className="talentCosts" >
    <h2>Talent Costs</h2>
    <FlexboxGrid align="middle" className="tableRows header">
      <FlexboxGrid.Item colspan={5}>Level</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={5}>Mora</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={10} className="flex1">Materials</FlexboxGrid.Item>
    </FlexboxGrid>
    {rows}
  </div>
}

export default CharacterInfoTalentCost;