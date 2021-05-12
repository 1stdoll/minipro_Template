import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image, OpenData } from '@tarojs/components'
import NoCustom from './no_custom.png'
import './index.scss'
const env = Taro.getEnv()
/* 头像组件 */
// 
// 
// 
//  
export default class Avatar extends Component {
  static defaultProps = {
    className: '',
    size: 128,
    circle: false,
    enable: false,
    src: '',
    noCustom: NoCustom
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
    const { className, circle, enable, src, size, noCustom } = this.props

    return (
      <View className={`avatar ${circle && 'circle'} ${className}`} style={{ width: `${size}rpx`, height: `${size}rpx` }} >
        { enable ?
          env === 'WEAPP' ?
            <OpenData type="userAvatarUrl" className='avatarImg' style={{ width: `${size}rpx`, height: `${size}rpx` }} />
            :
            <Image mode='aspectFill' className="avatarImg" src={src} />
          :
          <Image mode='aspectFill' className="avatarImg" src={noCustom} />
        }
      </View>
    )
  }
}