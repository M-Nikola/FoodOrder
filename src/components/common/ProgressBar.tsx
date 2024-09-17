import React, {memo} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getFontFamily} from '@utils/fonts';
import colors from '@utils/colors';

type ProgressBarProps = {
  style?: StyleProp<ViewStyle>;
  step: number;
  totalSteps: number;
};

const ProgressBar = memo(({style, step, totalSteps}: ProgressBarProps) => {
  const {t} = useTranslation('common');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${t('step')} ${step}`}</Text>
        <Text style={[styles.text, styles.subText]}>{` ${t(
          'of',
        )} ${totalSteps}`}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[styles.progress, {width: `${(100 / totalSteps) * step}%`}]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: getFontFamily('medium'),
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: colors.secondary,
  },
  subText: {
    fontWeight: '400',
    color: colors.secondaryLight,
  },
  progressContainer: {
    height: 1,
    backgroundColor: colors.primaryLight,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: colors.primary,
  },
});

export default ProgressBar;
