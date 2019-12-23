// @flow
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  FlatList,
  SectionList,
  ScrollView,
  AppState,
  StatusBar,
} from 'react-native';

import styles from './styles';

export default class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      peripherals: new Map(),
      comState: 'pause',
    };
  }

  onPressToNative() {
    console.log('to native ui');
    // PAJKSDKManager.openNativeVC();
  }

  onSendCommand(cmd) {}

  render() {
    const list = Array.from(this.state.peripherals.values());
    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={{marginBottom: 30}}> {this.state.comState} </Text>
          <FlatList
            style={styles.list}
            data={list}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight onPress={() => this.onPressItem(item)}>
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>
                    {item.id}
                    <Text style={{color: '#005068', marginLeft: 20}}>
                      {'\t'}
                      {item.name}
                    </Text>
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
          <View style={styles.btnWrap}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}> 开始扫描 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}> 开始测量 </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={this.onPressToNative.bind(this)}>
              <Text style={styles.btnText}> NativeUI </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
