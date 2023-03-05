import React from 'react-native';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import { colors } from '../utils/colors';
import { size, spacing } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || history.length === 0) return null;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.focusSubject}</Text>
      <Text style={styles.itemText}>{item.focusTime} Min</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.history}>Things we've focused on:</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    padding: spacing.sm,
    margin: size.size10,
    // borderWidth: 2,
    // borderColor: colors.lightGrey,
    // borderRadius: 2,
    // backgroundColor: 'green',
  },
  history: {
    color: colors.white,
    textAlign: 'left',
    fontSize: size.size18,
    // padding: spacing.md,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  item: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.sm,
    marginTop: size.size15,
    // marginBottom: size.size2,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText:{
    fontSize: size.size15,
    fontWeight: 'bold',
  }
});
