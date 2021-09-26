import Tags from "./Tags";
import ImgIcon from "../Icon";

const visionList = {
  "Anemo": (active) => <ImgIcon src="element anemo" size="48" className={active ? "enabled" : "disabled"} />,
  "Cryo": (active) => <ImgIcon src="element cryo" size="48" className={active ? "enabled" : "disabled"} />,
  // "dendro": <ImgIcon src="element dendro" size="48" />,
  "Electro": (active) => <ImgIcon src="element electro" size="48" className={active ? "enabled" : "disabled"} />,
  "Geo": (active) => <ImgIcon src="element geo" size="48" className={active ? "enabled" : "disabled"} />,
  "Hydro": (active) => <ImgIcon src="element hydro" size="48" className={active ? "enabled" : "disabled"} />,
  "Pyro": (active) => <ImgIcon src="element pyro" size="48" className={active ? "enabled" : "disabled"} />
}

const VisionTags = ({ defaultSelected, onChange }) => {
  return <Tags
    list={visionList}
    defaultSelected={defaultSelected}
    onChange={onChange}
  />
}

export default VisionTags;