import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';

import { Countdown } from '../components/Countdown';
import { colors } from '../utils/colors';
import { size, spacing } from '../utils/sizes';
import { RoundedBtn } from '../components/RoundedBtn';

export const Timer = ({ focusSubject, minutes, clearSubject, onTimerEnd }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject, minutes);
  }

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>We are Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ padding: spacing.xl }}>
        <ProgressBar
          progress={progress}
          color={colors.golden}
          style={{ height: spacing.sm }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedBtn
            size={120}
            fontSize={25}
            title={progress < 1 ? 'resume' : 'start'}
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedBtn
            size={120}
            fontSize={25}
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>

      <View style={styles.buttonWrapper}>
        <Button style={styles.reset} color="#f194ff" mode="contained" onPress={clearSubject}>
          Clear This Timer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'yellow'
  },
  content: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: size.size10,
    //backgroundColor: 'green'
  },
  title: {
    color: colors.white,
    fontSize: size.size20,
    textAlign: 'center',
  },
  task: {
    color: colors.golden,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: size.size30,
  },
  reset: {
    flex: 1,
    textAlign: 'center',
    margin: size.size10,
    backgroundColor: colors.lightGrey,
  },
  delete: {
    flex: 1,
    textAlign: 'center',
    margin: size.size10,
    backgroundColor: colors.red,
  },
});
