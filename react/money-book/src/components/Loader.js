import React from 'react'
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'
const Loader = () => (
  <div className="loading-component text-center">
    <Ionicon icon="ios-refresh"
      fontSize="40px"
      color={Colors.blue}
      rotate={true}
    />
    <h5>加载中</h5>
  </div>
)

export default Loader