import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

/* 滑动弹窗组件 */
// 
// 
// 
//  
export default class Popup extends Component {
  static defaultProps = {
    show: false,
    mask: false,
    position: 'bottom',
    onClose: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.props
    }
  }

  componentDidMount = () => { }

  maskClick = e => {
    const { onClose } = this.props
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { show, mask, position, children } = this.props

    return (
      <View className={`pop ${show && 'pop-show'}`}>
        {mask &&
          <View className='pop-mask' onClick={this.maskClick} onTouchMove={e => e.stopPropagation()} />
        }
        <View className={`content content-${position}`} onTouchMove={e => e.stopPropagation()}>
          {children}
        </View>
      </View>
    )
  }
}