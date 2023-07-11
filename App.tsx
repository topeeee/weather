import React from 'react';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/services/queryClient';
import {AppNavigation} from './src/navigations';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
};

export default App;
