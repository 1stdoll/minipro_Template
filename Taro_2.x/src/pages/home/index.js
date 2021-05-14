import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

const app = Taro.getApp()
const env = Taro.getEnv()

@connect(({ }) => ({}))
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  };

  shopTemp = []
  moduleTemp = {}

  componentDidMount = () => { };

  componentDidShow = () => { }

  componentDidHide = () => { }


  render() {
    const { } = this.state;
    const { } = this.props

    return (
      <View className='page'>
      </View>
    )
  }
}

export default Home
