import { View, Text } from 'react-native'
import React from 'react'
import MetaAI from './src/MetaAI'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MetaAI />
      </PersistGate>
    </Provider>
  )
}

export default App