import Tags from "./Tags";

const characterRarityList = {
  "4": "4-Star",
  "5": "5-Star"
}

const CharacterRarityTags = ({ defaultSelected, onChange }) => {
  return <Tags
    list={characterRarityList}
    defaultSelected={defaultSelected}
    onChange={onChange}
  />
}

export default CharacterRarityTags;