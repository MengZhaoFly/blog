// src/stores/theme-store.tsx
import { observable, action } from 'mobx'

export class ThemeStore {
  @observable
  theme = 'red';

  @action
  setTheme(newTheme) {
    this.theme = newTheme
  }
}