import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button, ButtonVariant} from '@components/common';
import {TOTAL_STEPS} from '@utils/constants';

type StepButtons = {
  step: number;
  nextDisabled: boolean;
  isEditing: boolean;
  onNext: () => void;
  onBack: () => void;
  onAddToCart: () => void;
  onGoToCheckout: (isEditing: boolean) => void;
};

const StepButtons = ({
  step,
  nextDisabled,
  isEditing,
  onNext,
  onBack,
  onAddToCart,
  onGoToCheckout,
}: StepButtons) => {
  const {t} = useTranslation('button');

  return (
    <>
      {step !== TOTAL_STEPS && (
        <View style={styles.buttons}>
          {step !== 1 && (
            <Button
              style={[styles.button, styles.backButton]}
              variant={ButtonVariant.outlined}
              text={t('back')}
              onPress={onBack}
            />
          )}
          <Button
            style={styles.button}
            isNext
            disabled={nextDisabled}
            variant={ButtonVariant.secondary}
            text={t('next')}
            onPress={onNext}
          />
        </View>
      )}

      {step === TOTAL_STEPS && (
        <View>
          {!isEditing && (
            <Button
              variant={ButtonVariant.secondary}
              text={t('addToCard')}
              onPress={onAddToCart}
            />
          )}
          <Button
            style={styles.goToCheckout}
            variant={ButtonVariant.outlined}
            text={t('goToCheckout')}
            onPress={() => onGoToCheckout(isEditing)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  backButton: {
    marginRight: 20,
  },
  goToCheckout: {marginTop: 15},
});

export default StepButtons;
