import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

/* 滑动操作组件 */
// 
// 
// 
//  
export default class SwipeAction extends Component {
  static defaultProps = {
    open: false,
    options: [],
    onChange: () => { },
  }

  constructor(props) {
    super(props)
    // console.log('props', props)
    this.state = {
      ...this.props
    }
  }

  dire = 0

  componentDidMount = () => { }

  onTouchStart = (e) => {       //  开始滑动时初始X坐标
    this.dire = e.changedTouches[0].clientX
  }

  onTouchEnd = (e) => {       //  结束滑动时判断X坐标偏移并判断是否显示开关
    const endX = e.changedTouches[0].clientX
    // console.log('end', endX - this.dire)
    const { onChange } = this.props
    if (!!onChange) onChange(endX - this.dire < -1)
  }

  render() {
    const { open, options, onClick, children } = this.props
    const btnList = !!options ? options.filter((i, o) => o < 4) : []
    return (
      <View
        className='swipeAction'
      >
        <View
          className='swipeAction-view'
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onClick={() => !!onClick && onClick()}
          style={{
            transform: `translateX(-${open ? btnList.length * 100 : 0}rpx)`
          }}
        >
          {children}
        </View>
        {btnList.length > 0 &&
          <View
            className='swipeAction-bar flex_C'
            style={{
              width: `${btnList.length * 100}rpx`,
            }}
          >
            {btnList.map((item, index) => (
              <View
                className='swipeAction-bar-btn flex_C'
                style={{ ...item.style }}
                onClick={() => !!item.onClick && item.onClick(index)}
              >
                {item.text}
              </View>
            ))}
          </View>
        }
      </View>
    )
  }
}