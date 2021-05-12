import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from "react-redux"
import { View, Text } from '@tarojs/components'
import './index.scss'

const { $app } = Taro.getApp()
const cmd = $app.commend
@connect(({ login }) => ({
  ...login
}))
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Hello world!',
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    console.warn('getapp => ', $app)
  }

  componentDidHide() { }

  change = () => {
    cmd.pageTo('index2', { url: 'https://www.baidu.com' })
    // Taro.navigateTo({ url: '../index2/index' })
  }

  render() {
    console.warn(this.props)
    const { text } = this.state
    const { count } = this.props
    return (
      <View className='index'>
        <Text>{text}</Text>
        <View className='btn' onClick={this.change}>{count}</View>
      </View>
    )
  }
}
