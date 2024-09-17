import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Card, Input, DropdownInput} from '@components/common';

const DeliveryForm = () => {
  const {t} = useTranslation('checkout');

  const validationSchema = Yup.object({
    name: Yup.string().required(t('required')),
    address: Yup.string().required(t('required')),
    email: Yup.string().email(t('emailInvalid')).required(t('required')),
    phone: Yup.string().min(8, t('phoneInvalid')).required(t('required')),
    payment: Yup.string()
      .oneOf(['cash', 'card'], t('invalidPayment'))
      .required(t('required')),
  });
  const paymentData = [
    {label: t('cash'), value: 'cash'},
    {label: t('card'), value: 'card'},
  ];

  return (
    <Card style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          address: '',
          phone: '',
          payment: '',
          note: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => console.log(values)}>
        {({values, errors, touched, handleChange, handleBlur}) => (
          <View>
            <Input
              label={t('fullname')}
              placeholder={t('fullnamePlaceholder')}
              error={(touched.name && errors.name) || ''}
              value={values.name}
              onBlur={handleBlur('name')}
              onChangeText={handleChange('name')}
            />
            <Input
              label={t('address')}
              placeholder={t('addressPlaceholder')}
              error={(touched.address && errors.address) || ''}
              value={values.address}
              onBlur={handleBlur('address')}
              onChangeText={handleChange('address')}
            />
            <Input
              label={t('phone')}
              placeholder={t('phonePlaceholder')}
              keyboardType="phone-pad"
              error={(touched.phone && errors.phone) || ''}
              value={values.phone}
              onBlur={handleBlur('phone')}
              onChangeText={handleChange('phone')}
            />
            <DropdownInput
              data={paymentData}
              error={(touched.payment && errors.payment) || ''}
              label={t('cashOrCard')}
              placeholder={t('choosePaymentMethod')}
              value={values.payment}
              handleBlur={() => handleBlur('payment')}
              handleChange={() => handleChange('payment')}
            />
            <Input
              style={styles.noMargin}
              isRequired={false}
              label={t('note')}
              placeholder={t('notePlaceholder')}
              multiline
              value={values.note}
              onBlur={handleBlur('note')}
              onChangeText={handleChange('note')}
            />
          </View>
        )}
      </Formik>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 0},
  noMargin: {
    marginBottom: 0,
  },
});

export default DeliveryForm;
