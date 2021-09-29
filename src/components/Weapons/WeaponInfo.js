// import genshindb from 'genshin-db';

import WeaponInfoHeader from "./WeaponInfoHeader";
import WeaponInfoRefinements from "./WeaponInfoRefinements";
import WeaponInfoStats from "./WeaponInfoStats";

const WeaponInfo = ({ data }) => {
  const { name } = data;
  return <div className="weaponInfo">
    <h1>{name}</h1>
    <WeaponInfoHeader data={data} />
    <WeaponInfoStats data={data} />
    <WeaponInfoRefinements data={data} />
  </div>
}

export default WeaponInfo;