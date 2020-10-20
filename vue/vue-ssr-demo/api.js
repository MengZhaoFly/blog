import axios from 'axios';
import { resolve } from './webpack.base';

export const fetchItem = () => {
  return new Promise((resolve, reject) => {
    resolve({
      title: 'title 111'
    })
  })
}