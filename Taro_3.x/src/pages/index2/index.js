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
      text: 'fucking world!',
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  change = () => {
    const { dispatch } = this.props
    dispatch({
      type: "login/test",
      params: 9,
      callback: (res) => {
        this.setState({
          text: '??????'
        })
      }
    })
  }

  render() {
    // console.warn(this.props)
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
