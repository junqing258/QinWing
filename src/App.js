/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import CodePush from 'react-native-code-push'; // 引入code-push
import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {createStackNavigator} from 'react-navigation';

import HomeScreen from './pages/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

// const CODE_PUSH_KEY = 'n9-N23GSMyvumHZfDIuQ2aEydiDIgO6pTr3fu';
const CODE_PUSH_KEY = 'WQhxRc38c0A5RIaamRCcV-JXNRo-NQAfHW0AlZ';

const codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      syncMessage: '',
    };
  }
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.syncMessage = 'Checking for update';
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.syncMessage = 'Downloading package';
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.syncMessage = 'Awaiting user action';
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.syncMessage = 'Installing update';
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.syncMessage = 'App up to date.';
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.syncMessage = 'Update cancelled by user';
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.syncMessage = 'Update installed and will be applied on restart.';
        Alert.alert('更新已安装');
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        // this.syncMessage = 'An unknown error occurred';
        this.syncMessage = JSON.stringify(CodePush.SyncStatus);
        // this.setState({modalVisible: false});
        Alert.alert('error', JSON.stringify(CodePush.SyncStatus));
        break;
    }
    // this.setState({syncMessage: this.syncMessage});
  }
  //
  syncImmediate() {
    CodePush.sync(
      {
        updateDialog: false,
        // deploymentKey: CODE_PUSH_KEY,
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange.bind(this),
      ({receivedBytes, totalBytes}) => {},
    );
    /* CodePush.checkForUpdate().then(update => {
      if (!update) {
        console.log('app是最新版了');
      } else {
        console.log('有更新哦');
      }
    }); */
  }

  /* componentWillMount() {
  } */

  componentDidMount() {
    // codePush.allowRestart(); //在加载完了，允许重启
    // CodePush.disallowRestart(); //禁止重启
    this.syncImmediate(); //开始检查更新
  }

  componentWillUnmount() {
    // Reallow restarts, and optionally trigger
    // a restart if one was currently pending.
    // CodePush.allowRestart();
  }

  componentDidUpdate() {
    console.log('update');
  }

  render() {
    return <AppNavigator />;
  }
}

export default CodePush(codePushOptions)(App);
