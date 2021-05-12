import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

/* 开关组件 */
// 
// 
// 
//  
export default class Switch extends Component {
  static defaultProps = {
    color: '#337FE6',
    btColor: '#FFFFFF',
    size: 48,
    checked: false
  }

  constructor(props) {
    super(props)
    // console.log('props', props)
    this.state = {
      ...this.props
    }
  }

  componentDidMount = () => { }

  onClick = () => {       //  点击事件返回
    const { onChange, checked } = this.props
    if (onChange) onChange(!checked)
  }

  render() {
    const { color, btColor, checked, size } = this.props

    return (
      <View
        className='switch'
        style={{
          backgroundColor: checked ? color : '#d8d8d8',
          height: `${size + 4}rpx`,
          borderRadius: `${(size + 8) / 2}rpx`,
          width: `${size * 1.8}rpx`,
          boxShadow: checked ? 'none' : '0 0 4rpx #e5e5e5'
        }}
        onClick={this.onClick}
      >
        <View
          className='switch-ball'
          style={{
            backgroundColor: btColor,
            height: `${size}rpx`,
            width: `${size}rpx`,
            boxShadow: checked ? 'none' : '0 0 4rpx #e5e5e5',
            borderColor: checked ? color : '#d8d8d8',
            left: checked ? `${size * 0.8 - 4}rpx` : 0
          }}
        />
      </View>
    )
  }
}