import React, { Component } from 'react';
import { CounterStore } from './stores/counter-store'
import { ThemeStore } from './stores/theme-store'
export const stores = {
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
}
export const storesContext = React.createContext({
  ...stores
})