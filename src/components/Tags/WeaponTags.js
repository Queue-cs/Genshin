import Tags from "./Tags";
import ImgIcon from "../Icon";

const weaponList = {
  "Sword": (active) => <ImgIcon src="wtype sword" size="48" className={active ? "enabled" : "disabled"} />,
  "Claymore": (active) => <ImgIcon src="wtype claymore" size="48" className={active ? "enabled" : "disabled"} />,
  "Polearm": (active) => <ImgIcon src="wtype polearm" size="48" className={active ? "enabled" : "disabled"} />,
  "Bow": (active) => <ImgIcon src="wtype bow" size="48" className={active ? "enabled" : "disabled"} />,
  "Catalyst": (active) => <ImgIcon src="wtype catalyst" size="48" className={active ? "enabled" : "disabled"} />,
}


const WeaponTags = ({ defaultSelected, onChange }) => {
  return <Tags
    list={weaponList}
    defaultSelected={defaultSelected}
    onChange={onChange}
  />
}

export default WeaponTags;