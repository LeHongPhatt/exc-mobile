import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {dimensions, width} from 'utils';
const {height} = dimensions;
export default StyleSheet.create({
  nextButton: {},
  buttonContainer: {},
  textWhite: {
    color: Colors.white,
    fontSize: 15,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 87, 34, .9)',
    borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {backgroundColor: Colors.border},
  slide: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: height * 0.88,
  },
  viewsct: {
    // height: height / 3,
    // alignItems: 'flex-start',
    width: '96%',
  },
  image: {
    resizeMode: 'stretch',
    width,
    height,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
  },
  bgLotie: {flex: 1, backgroundColor: Colors.main},
});
