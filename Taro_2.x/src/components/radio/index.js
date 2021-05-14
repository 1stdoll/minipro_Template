import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

/* 单选组件 */
// 
// 
// 
//  
export default class Radio extends Component {
  static defaultProps = {
    checked: false,
    style: '',
    onChange: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.props
    }
  }

  componentDidMount = () => { }

  render() {
    const { style, checked, onChange, children } = this.props
    return (
      <View className='flex_C' style={style} onClick={() => !!onChange && onChange(!checked)}>
        <View className={`radio radio_${checked && 'checked'}`} />
        {!!children && <View className='radio_content'>{children}</View>}
      </View>
    )
  }
}