import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

/* 暂无数据提示组件 */
// 
// 
// 
//  
export default class dataNone extends Component {
  static defaultProps = {
    text: ''
  }

  constructor(props) {
    super(props)
    // console.log('props', props)
    this.state = {
      ...this.props
    }
  }

  render() {
    const { text } = this.props

    return (
      <View className="dataNone" >
        <View className='dataNone-icon' />
        <View className='dataNone-text'>{text}</View>
      </View>
    )
  }
}