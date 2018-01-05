import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, SectionList, TouchableOpacity, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Mailer from 'react-native-mail';

export default class InformationScreen extends React.Component {
  static navigationOptions = {
    title: 'Information',
    tabBarLabel: 'Information',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/info.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  componentWillMount() {
    this.setState({
      sections: [
        {
          title: "My Title",
          data: [{title: "Contact via Email"}, {title: "Contact via Twitter"}]
        }
      ]
    });
  }

  processPress(item) {
    this.sendSupportEmail();
    console.log(item);
  }

  sendSupportEmail() {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'OK', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  renderRow(item) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity onPress={() => this.processPress(item)}>
        <View style={styles.infoMainContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{item.title}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Image style={styles.arrow} source={require('../images/arrow.png')} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SectionList
        sections={this.state.sections}
        renderItem={({item}) => this.renderRow(item)}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}></Text>}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0,
   backgroundColor: 'transparent'
  },
  infoMainContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
  },
  sectionHeader: {
    marginTop: 10,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    backgroundColor: 'transparent',
    height: 20,
    fontSize: 14,
    fontWeight: 'bold',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
  },
  talkTextContainer: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10
  },
  speakerImage: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 10
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    borderRadius: 10,
    fontSize: 18,
    marginLeft: 10
  },
  talkSpeaker: {
    paddingTop: 5,
    fontSize: 16,
  },
  talkInformation: {
    margin: 10,
    marginTop: 0,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  speakerContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 5
  },
  arrow: {
    height: 25,
    paddingRight: 15,
  }
})
