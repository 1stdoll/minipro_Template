import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { moment } from '@/utils/utils'
import './index.scss'

/* 分割线组件 */
// 
// 
// 
//  
export default class Divider extends Component {
  static defaultProps = {
    content: '没有了',
    ftSize: '24rpx',
    lSize: 2,
    color: '#cecece',
    lPadding: 12
  }

  constructor(props) {
    super(props)
    // console.log('props', props)
    this.state = {
      ...this.props
    }
  }

  componentDidMount = () => { }

  render() {
    const { content, ftSize, lSize, color, lPadding } = this.props

    return (
      <View className="divider" >
        <View className='_line' style={{ paddingLeft: `${lPadding}rpx`, paddingTop: `${lSize}rpx`, backgroundColor: color }} />
        {content &&
          <View className='_content' style={{ fontSize: ftSize, color: color }}>
            <Text>{content}</Text>
          </View>
        }
        <View className='_line' style={{ paddingLeft: `${lPadding}rpx`, paddingTop: `${lSize}rpx`, backgroundColor: color }} />
      </View>
    )
  }
}