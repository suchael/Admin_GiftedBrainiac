import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BasicComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, this is a basic React Native component!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default BasicComponent;
