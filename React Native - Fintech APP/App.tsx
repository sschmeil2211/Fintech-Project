import React from 'react';
import AppNavigator from './src/navigation/StackNavigation';
import UserProvider from './src/view_models/providers/UserProvider'; 

function App(): JSX.Element {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}

export default App; 