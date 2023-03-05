import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { size, spacing } from '../utils/sizes';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { RoundedBtn } from '../components/RoundedBtn';

export const Focus = ({ addSubject, addMinutes, containerFlex }) => {
  const [subject, setSubject] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const startTimer = () => {
    if (subject === '' || subject === null) {
      setError('Please Enter Subject');
      setVisible(true);
    } else if (minutes === '' || minutes === 0) {
      setError('Please Enter Minutes');
      setVisible(true);
    } else {
      addSubject(subject);
      addMinutes(minutes);
    }
  };

  return (
    <View style={{flex: containerFlex, justifyContent: 'center',}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="What would you like to focus on?"
          onChangeText={setSubject}
        />

        <TextInput
          style={styles.textInput}
          label="For how much time? (in minutes)"
          onChangeText={setMinutes}
        />

        <Button
          style={{ backgroundColor: colors.golden }}
          icon="timer"
          mode="contained"
          onPress={() => startTimer()}>
          Start Timer
        </Button>
      </View>

      <Snackbar style={{ backgroundColor: colors.red }} visible={visible} onDismiss={onDismissSnackBar} duration={1500}>
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    margin: size.size10,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    borderRadius: 2,
  },
  textInput: {
    marginBottom: spacing.md,
  },
});
