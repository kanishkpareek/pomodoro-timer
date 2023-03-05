import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Asset } from 'expo-asset';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [minutes, setMinutes] = useState(0.1);
  const [history, setHistory] = useState([]);

  return (
    <ImageBackground
      source={{ uri: Asset.fromModule(require('./assets/app-bg.png')).uri }}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        {!currentSubject || !minutes ? (
          <>
            <Focus
              addSubject={setCurrentSubject}
              addMinutes={setMinutes}
              containerFlex={!history || history.length === 0 ? 1 : 0.4}
            />
            {!history || history.length === 0 ? (
              <></>
            ) : (
              <FocusHistory history={history} />
            )}
          </>
        ) : (
          <Timer
            focusSubject={currentSubject}
            minutes={minutes}
            onTimerEnd={(focusedSubject, focusedMin) => {
              setHistory([
                ...history,
                {
                  focusSubject: focusedSubject,
                  focusTime: focusedMin,
                },
              ]);
            }}
            clearSubject={() => {
              setCurrentSubject(null);
              setMinutes(0);
            }}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
