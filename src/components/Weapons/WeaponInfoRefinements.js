import React from 'react';
import { FlexboxGrid } from 'rsuite';
import Utils from '../../Utils';

const WeaponInfoRefinements = ({ data }) => {
  const { effect, effectname } = data;
  if (effect === "") return "";
  const refinements = [data.r1, data.r2, data.r3, data.r4, data.r5];
  console.log(data);
  let blocks = [];
  for (let i = 0; i < refinements.length; i++) {
    const r = refinements[i];
    if (!r) continue;
    blocks.push(
      <FlexboxGrid align="middle" className="refinement" key={"refine" + i}>
        <FlexboxGrid.Item colspan={2}>
          R{i + 1}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22}>
          {Utils.Markdown(Utils.StringFormat(effect, r))}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
  return <FlexboxGrid className="refine">
    <FlexboxGrid.Item colspan={24}>
      <h1>Refinements</h1>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={24}>
      <h3>{effectname}</h3>
    </FlexboxGrid.Item>
    <FlexboxGrid.Item colspan={24} className="refinements">
      {blocks}
    </FlexboxGrid.Item>
  </FlexboxGrid>
}

export default WeaponInfoRefinements;