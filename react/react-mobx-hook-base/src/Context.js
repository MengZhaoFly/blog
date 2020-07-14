import React, { Component } from 'react';
import { CounterStore } from './stores/counter-store'
import { ThemeStore } from './stores/theme-store'

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
})