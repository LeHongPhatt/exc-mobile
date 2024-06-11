import Icon from './svg/Icon';
import Other from './svg/Other';
import SvgFile from './svg/SvgFile';
import TabBar from './svg/TabBar';
import Logo from './svg/logo.svg';

const SvgIcon = {
  ...SvgFile,
  ...TabBar,
  ...Icon,
  ...Other,
  ...Logo,
};

export default SvgIcon;
