import Taro,{ Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import Popup from '@/components/popup'
import './index.scss'

/* 选择器组件 */
// 
// 
// 
//  
export default class Picker extends Component {
  static defaultProps = {
    rang: [],
    value: [],
    title: '选择'
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.props,
      pickVal: [],
      show: false
    }
  }

  pickVal = []
  pageSize = 1

  componentWillMount = () => {
    this.pageSize = Taro.getApp().pageSize
  }

  change = (e) => this.setState({ pickVal: e.detail.value })      //  改变选中项

  onChange = () => {      //  返回选中项
    const { onChange } = this.props
    const { pickVal } = this.state
    if (!!onChange) onChange(this.pickVal)
    this.hidePicker()
  }

  showPicker = () => this.setState({ show: true })      //  显示滑动选择框

  hidePicker = () => this.setState({ show: false })     //  隐藏滑动选择框

  getPickerCol = () => {                                //  获取选中项改变后的列选项
    const { range, value, rangeKey } = this.props
    const { pickVal } = this.state
    let keys = [], list = []
    // console.log('range', range)
    const getChild = (data) => {
      if (data.length === 0) return
      keys = [...keys, pickVal[keys.length] === void 0 ? 0 : pickVal[keys.length]]
      list = [...list, [...data]]
      if (!!data[keys[keys.length - 1]].children) getChild(data[keys[keys.length - 1]].children)
    }
    let moveStart = 0
    const colChange = (index, pagey) => {
      let move = Math.abs(moveStart - pagey) * this.pageSize
      let moveIdx = parseInt(move / 60) + (move % 60 > 30 ? 1 : 0)
      let mathType = moveStart - pagey < 0 ? -1 : 1
      let idx_end = keys[index] + moveIdx * mathType
      idx_end = idx_end <= 0 ? 0 : idx_end >= list[index].length - 1 ? list[index].length - 1 : idx_end
      if (pickVal[index] !== idx_end) {
        if (index === 0) keys = []
        keys[index] = idx_end
        // console.log('colChange', moveStart, pagey, index, moveIdx * mathType, keys)
        this.setState({ pickVal: keys })
      }
      moveStart = 0
    }
    if (typeof range === 'object') getChild(range)
    this.pickVal = keys
    // console.log('range list ', list)
    // console.log('range key ', keys)
    return (
      <View className='picker-view picker-view-mask'>
        <View className='picker-view-content'>
          {list && list.map((i, o) => (
            <Swiper
              key={`col-${o}`}
              className='picker-view-col'
              vertical
              duration={200}
              previousMargin={`${165 / this.pageSize}px`}
              nextMargin={`${165 / this.pageSize}px`}
              acceleration={true}
              current={keys[o]}
              onTouchStart={e => moveStart = e.changedTouches[0].pageY}
              onTouchEnd={e => colChange(o, e.changedTouches[0].pageY)}
            >
              {i.map((item, idx) => <SwiperItem key={`col-${o}-row-${idx}`} style='height:60rpx'><View className="picker-view-row" style={{ color: keys[o] === idx ? '#333333' : '#c5c5c5' }}>{!!rangeKey ? item[rangeKey] : item}</View></SwiperItem>)}
            </Swiper>
          ))}
        </View>
      </View>
    )
  }

  render() {
    const { value, onChange, children, title } = this.props
    const { show } = this.state
    return (
      <View className="picker" >
        <View onClick={this.showPicker}>
          {children}
        </View>
        <Popup show={show} mask onClose={this.hidePicker}>
          <View className='picker-view-box'>
            <View className='picker-view-title'>
              <View className='picker-view-title-left' onClick={this.hidePicker}>
                取消
              </View>
              <View className='picker-view-title-center'>
                {title}
              </View>
              <View className='picker-view-title-right' onClick={this.onChange}>
                确认
              </View>
            </View>
            {this.getPickerCol()}
          </View>
        </Popup>
      </View>
    )
  }
}