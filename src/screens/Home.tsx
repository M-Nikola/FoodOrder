import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from '@components/common';
import {Step1, Step2, Step3, Step4, StepButtons} from '@components/home';
import {TOTAL_STEPS} from '@utils/constants';
import {useOrderStore} from '@stores/order';
import {Order} from '@api/models';

const HomeScreen = () => {
  const {
    step,
    currentOrder,
    editOrderIndex,
    setStep,
    addToCart,
    finishEditing,
  } = useOrderStore();
  const navigation = useNavigation();

  const isNextDisabled = useMemo(() => {
    switch (step) {
      case 1:
        return !currentOrder?.bowl;
      case 2:
        return (
          !currentOrder?.size || !currentOrder?.base || !currentOrder?.sauce
        );

      default:
        return false;
    }
  }, [step, currentOrder]);

  const stepComponentMap = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
  };

  const StepComponent = stepComponentMap[step as keyof typeof stepComponentMap];

  const handleAddToCart = useCallback(() => {
    if (
      currentOrder.base &&
      currentOrder.bowl &&
      currentOrder.size &&
      currentOrder.sauce
    ) {
      addToCart({
        count: 1,
        base: currentOrder.base,
        bowl: currentOrder.bowl,
        sauce: currentOrder.sauce,
        size: currentOrder.size,
        ingredients: currentOrder.ingredients,
        extraIngredients: currentOrder.extraIngredients,
      });
    }
  }, [
    addToCart,
    currentOrder.base,
    currentOrder.bowl,
    currentOrder.extraIngredients,
    currentOrder.ingredients,
    currentOrder.sauce,
    currentOrder.size,
  ]);

  const handleGoToCheckout = useCallback(
    (isEditing: boolean) => {
      if (isEditing && editOrderIndex !== undefined) {
        finishEditing(editOrderIndex, currentOrder as Order);
      } else {
        handleAddToCart();
      }
      navigation.navigate('CartTab');
    },
    [currentOrder, editOrderIndex, finishEditing, handleAddToCart, navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        alwaysBounceVertical={false}>
        <StepComponent />
        <StepButtons
          step={step}
          nextDisabled={isNextDisabled}
          isEditing={editOrderIndex !== undefined}
          onBack={() => setStep(step - 1)}
          onNext={() => setStep(step + 1)}
          onAddToCart={handleAddToCart}
          onGoToCheckout={handleGoToCheckout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
