import React, {useCallback, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Card, RadioButtonGroup} from '@components/common';
import {getBowls} from '@api/index';
import {useOrderStore} from '@stores/order';

const Step1 = () => {
  const {data: bowls = []} = useQuery({queryKey: ['bowls'], queryFn: getBowls});
  const {currentOrder, updateCurrentOrder} = useOrderStore();
  const {t} = useTranslation('home');

  const bowlsOptions = useMemo(
    () => bowls.map(({id, name}) => ({value: String(id), label: name})),
    [bowls],
  );

  const handleOnChange = useCallback(
    (id: string) =>
      updateCurrentOrder({
        bowl:
          currentOrder?.bowl?.id === Number(id)
            ? undefined
            : bowls.find(bowl => bowl.id === Number(id)),
      }),
    [bowls, currentOrder?.bowl?.id, updateCurrentOrder],
  );

  return (
    <Card>
      <RadioButtonGroup
        title={t('step1.title')}
        subtitle={t('step1.description')}
        selected={String(currentOrder?.bowl?.id)}
        options={bowlsOptions}
        onChange={handleOnChange}
      />
    </Card>
  );
};

export default Step1;
