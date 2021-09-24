import { FlexboxGrid } from 'rsuite';

import Utils from '../../Utils';
import ImgIcon from '../Icon';

const CharacterInfoPassive = ({ passiveData, image }) => {

  return <FlexboxGrid className="constellations" align="middle">
    <FlexboxGrid.Item className="paddedSides">
      <ImgIcon src={image} img size="50" />
    </FlexboxGrid.Item>
    <FlexboxGrid.Item className="flex1">
      <h3>{passiveData.name}</h3>
      {Utils.Markdown(passiveData.info)}
    </FlexboxGrid.Item>
  </FlexboxGrid>
}

export default CharacterInfoPassive;