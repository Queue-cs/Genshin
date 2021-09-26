import Tags from "./Tags";

const weaponRarityList = {
  "1": "1-Star",
  "2": "2-Star",
  "3": "3-Star",
  "4": "4-Star",
  "5": "5-Star"
}

const WeaponRarityTags = ({ defaultSelected, onChange }) => {
  return <Tags
    list={weaponRarityList}
    defaultSelected={defaultSelected}
    onChange={onChange}
  />
}

export default WeaponRarityTags;