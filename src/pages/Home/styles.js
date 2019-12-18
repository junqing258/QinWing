import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

const window = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();
//https://blog.csdn.net/kakaxiqianxin/article/details/80666731

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrap: {
    width: window.width,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    display: 'flex',
    height: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    backgroundColor: '#07c160',
    justifyContent: 'center',
    margin: 8,
    marginBottom: 30,
    overflow: 'hidden',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    width: window.width,
    backgroundColor: '#ccc',
    margin: 10,
  },
  listItem: {
    display: 'flex',
  },
  listItemText: {
    fontSize: 16,
  },
  row: {
    margin: 10,
  },
});
const merge = Object.assign;

export {styles as default, merge};
