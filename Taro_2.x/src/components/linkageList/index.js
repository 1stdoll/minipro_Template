import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ShopItem from '../shopItem/index.js'
import './index.scss'

const app = Taro.getApp()

export default class LinkageList extends Component {
  static defaultProps = {
    myclass: '',
    Height: 0,
    blankHeight: 0,
    ListOneWidth: '30%',
    List: [],
    onChange: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      topArr: [],
      listOneId: 0,
      ListOneKey: '',
      ListTwoKey: '',
    }
  }

  listScroll = false

  componentDidMount = () => { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.List.length !== 0 && this.props.List.length === 0) {
      Taro.showLoading({ title: '加载中' });
      this.setState({
        listOneId: nextProps.List[0].id,
        ListTwoKey: `two-${nextProps.List[0].id}`,
      }, () => this.getElementTop())
    }
  }

  //  获取商品列表每个分类DOM距离父标签顶部的距离
  getElementTop = () => {
    const query = Taro.createSelectorQuery().in(this.$scope)
    app.selector('.list-two-box', query).then(res => {
      let topArr = res[0].map((item) => {
        return item.top - res[0][0].top;	/* 减去滚动容器距离顶部的距离 */
      });
      Taro.hideLoading()
      this.setState({
        topArr
      })
    })
  }

  ListOneClick = (key) => {
    this.listScroll = false
    this.setState({
      listOneId: key,
      ListTwoKey: `two-${key}`,
    })
  }

  onListScr = e => {
    if (this.listScroll === false) return
    const { topArr, listOneId } = this.state
    const { List } = this.props
    let top = e.detail.scrollTop;
    let index = 0;
    /* 查找当前滚动距离 */
    for (let i = (topArr.length - 1); i >= 0; i--) {
      /* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
      if ((top + 2) >= topArr[i]) {
        index = i;
        break;
      }
    }
    const nIndex = (index < 0 ? 0 : index);
    if (listOneId === List[nIndex].id) return
    this.setState({
      listOneId: List[nIndex].id,
      ListOneKey: `one-${List[nIndex].id}`
    })
  }

  render() {
    const { myclass, Height, blankHeight, ListOneWidth, List, onChange } = this.props
    const { listOneId, ListOneKey, ListTwoKey } = this.state
    return (
      <View className={`LinkageList ${myclass}`} style={`height:${Height !== 0 ? Height + 'px' : '100%'}`}>
        {/*列表1*/}
        <ScrollView
          className='list-one'
          style={`width:${ListOneWidth}`}
          scrollIntoView={ListOneKey}
          scrollY
        >
          <View className='list-one-box'>
            {List.length > 0 && List.map(group => (
              <View
                className={`list-one-box_item ${listOneId === group.id && 'list-one-box_select'}`}
                id={`one-${group.id}`}
                key={`one-${group.id}`}
                onClick={() => this.ListOneClick(group.id)}
              >
                <Text style="flex:1">
                  {group.title}
                </Text>
              </View>
            ))}
            <View style={`height:${blankHeight * 1.2}px`} />
          </View>
        </ScrollView>
        {/*列表2*/}
        <ScrollView
          className='list-two'
          scrollY
          scrollIntoView={ListTwoKey}
          onTouchStart={() => { this.listScroll = true }}
          onScroll={this.onListScr}
        >
          {List.map(group => (
            <View id={`two-${group.id}`} key={`two-${group.id}`} className='list-two-box'>
              <View className='group-bar'>
                <View className='group-header'>{group.title}</View>
              </View>
              <View className='group-box'>
                {group.list.map(item => (
                  <ShopItem
                    key={`two-item-${item.id}-${item.quantity}`}
                    onChange={(id, v) => onChange(id, v)}
                    isNumber
                    data={item}
                  />
                ))}
              </View>
            </View>
          ))}
          <View style={`height:${blankHeight * 1.1}px`} />
        </ScrollView>
      </View>
    )
  }
}