import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'

/* 模拟滚动列表组件 */
// 
// 
// 
//  
export default class VirtualList extends Component {
  static defaultProps = {
    className: '',
    style: '',
    boxStyle: '',         /*  内部容器样式  */
    vertical: 'y',        /*  滚动方向  */
    height: 0,            /*  滚动组件高度  */
    scrollDown: 50,       /*  出发触底事件的距离（px）  */
    loadMore: false,      /*  允许出发触底事件  */
    visibleSize: 1,       /*  画面外的渲染数量  */
    itemSize: [],         /*  用于计算列表单项高度的高度表(string/array)rpx  */
    dataList: [],         /*  数据,对应高度字段（size）  */
    onLoadMore: () => { } /*  触底事件
    itemElevent={}            自定义的单项渲染方法,(item,index)=>ReactElement    */
  }

  loading = false

  constructor(props) {
    super(props)
    this.state = {
      ...this.props,
      listH: 0,
      transform: 'translate3d(0,0px,0)',
      visibleData: []
    }
  }

  itemTop = []
  listH = 0
  startIdx = 0
  showSize = 0
  pageSize = 1

  componentWillMount = () => {
    this.pageSize = Taro.getApp().pageSize
    Taro.eventCenter.on('virtuaListUpdate', () => { console.log('virtuaListUpdate'), this.visibleData(this.startIdx, this.startIdx + this.showSize) })
  }

  getListH = () => {      //  获取虚拟列表高度，并处理每一个待渲染项的定位高度
    const { height, itemSize, dataList } = this.props
    if (dataList.length === 0) { this.itemTop = [], this.listH = 0, this.showSize = 0; return 0 }
    if (this.itemTop.length === dataList.length) return this.listH
    // console.warn('itemSize', itemSize)
    if (typeof itemSize === 'number') {
      const SizeArr = (itemSize + 30) / this.pageSize
      this.listH = dataList.length * SizeArr
      this.itemTop = dataList.map((_, i) => i * SizeArr)
      if (this.showSize === 0) { this.showSize = parseInt(height / SizeArr) }
    } else {
      const SizeArr = itemSize.map(i => parseInt((i + 30) / this.pageSize))
      if (this.showSize === 0) { const tempArr = [...SizeArr]; this.showSize = parseInt(height / tempArr.sort()[0]); }
      dataList.forEach((i, o) => {
        if (this.itemTop.length < o + 1) {
          this.itemTop[o] = this.listH
          this.listH += SizeArr[i.size]
          // console.warn(o + 1, this.listH)
        }
      })
    }
    // console.log('itemTop', this.itemTop)
    this.visibleData(this.startIdx, this.startIdx + this.showSize)
    return this.listH
  }

  visibleData = (start, end, otherData) => {      //  将需要显示的数据列表放入带渲染列表
    const { dataList, visibleSize } = this.props
    if (dataList.length === 0) return this.setState({ visibleData: [] })
    // console.warn(Math.max(start - visibleSize, 0), Math.min(dataList.length , end + visibleSize))
    const data = dataList.slice(Math.max(start - visibleSize, 0), Math.min(dataList.length, end + visibleSize))
    this.setState({ visibleData: data, ...otherData })
  }

  scrollDown = (e) => {      //  滑动至底部时触发加载更多
    const { loadMore, onLoadMore } = this.props
    if (this.loading) return
    if (loadMore && !!onLoadMore) {
      this.loading = true
      onLoadMore({ callback: () => this.loading = false })
    }
  }

  onScroll = (e) => {      //  滑动列表并判断是否需要重新渲染列表
    const { scrollTop } = e.detail
    const { height, visibleSize } = this.props
    const { startIdx } = this.props
    let temp = [...this.itemTop]
    const findNear = (top) => {
      const a = this.itemTop.filter(i => i > top)[0]
      const idx = this.itemTop.indexOf(a)
      return idx
    }
    let start = 0
    start = findNear(scrollTop)
    // console.log(start, end)
    if (start !== this.startIdx) {
      // console.log('chagne', start, this.startIdx)
      this.startIdx = start
      this.visibleData(this.startIdx, this.startIdx + this.showSize, { transform: `translate3d(0,${this.itemTop[Math.max(start - visibleSize, 0)]}px,0)` })
    }
  }

  render() {
    const { itemElevent, height, vertical, scrollDown, className, style, boxStyle, dataList } = this.props
    const scrollProps = {
      [`scroll${vertical.toUpperCase()}`]: true,
      lowerThreshold: scrollDown,
      style: { ...style, [vertical === 'x' ? 'width' : 'height']: height }
    }

    const { transform, visibleData } = this.state
    const listH = this.getListH()
    // console.log('components virtualList render =>', this.props)
    return (
      <ScrollView
        {...scrollProps}
        onScrollToLower={this.scrollDown}
        onScroll={this.onScroll}
        className={`my-virtual ${className}`}
      >
        <View className='my-virtual-box' style={{ [vertical === 'x' ? 'width' : 'height']: `${listH || 0}px`, ...boxStyle }}>
          {/* <View className='virtual-list' style={{ transform: transform }}> */}
          {!!itemElevent && visibleData.length > 0 &&
            visibleData.map((i, o) => (
              <View key={`virtual-item-${i.id}`} className='my-virtual-list-item' style={{ [vertical === 'x' ? 'left' : 'top']: `${this.itemTop[i.index]}px` }} >{itemElevent(i, o)}</View>
            ))}
          {/* </View> */}
        </View>
      </ScrollView>
    )
  }
}