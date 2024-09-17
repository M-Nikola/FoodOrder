import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppTab} from '@navigation/index';
import '@utils/i18n/i18n';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppTab />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
