import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

export default function NoLiked({ navigation, visible }) {
  if (!visible) 
    return null;

  return (
    <View style={{
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}>
      <View style={styles.container}>
        <Text style={styles.text}>You haven't saved any movies yet</Text>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('SearchScreen')}}>
          <Text style={styles.button}>Click to Search</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },

  text: {
    fontFamily: 'MontserratRegular', 
    fontSize: 16, 
    marginBottom: 25
  },

  button: {
    fontFamily: 'MontserratMedium', 
    fontSize: 18, 
    padding: 10, 
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 999
  }
})