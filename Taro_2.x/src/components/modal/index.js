import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

/* 弹窗组件 */
// 
// 
// 
//  
export default class Modal extends Component {
  static defaultProps = {
    show: false,
    mask: false,
    cancelText: '取消',
    cancelColor: '#333333',
    confirmText: '确认',
    confirmColor: '#2F7EE8',
    // onClose: () => { },
    // onCancel: () => { },
    // onConfirm: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.props
    }
  }

  componentDidMount = () => { }

  stopMove = e => e.stopPropagation()

  maskClick = e => {
    const { onClose } = this.props
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 200);
    }
  }

  render() {
    const { show, mask, children, content, onClose, onCancel, onConfirm, cancelText, cancelColor, confirmText, confirmColor } = this.props

    return (
      <View className={`modal ${show && 'modal-show'}`}>
        {mask &&
          <View className='mask' onClick={this.maskClick} onTouchMove={this.stopMove} />
        }
        <View
          className={`content ${!show && 'content_hide'}`}
          style={{ transform: `translate(-50%,${show ? ' -50%)' : ' 0) scale(0)'}` }}
        >
          {!!content && (
            <View className='modal-content'>
              <View className='modal-content-top flex_C'>
                {content}
              </View>
              <View
                className='modal-content-foot flex_C'
                style={{ borderTopWidth: !!onCancel && !!onConfirm ? '2rpx' : 0 }}
              >
                {!!onCancel && <View style={{ color: cancelColor }} onClick={() => !!onCancel && onCancel()}>{cancelText}</View>}
                {!!onConfirm && <View style={{ color: confirmColor }} onClick={() => !!onConfirm && onConfirm()}>{confirmText}</View>}
              </View>
            </View>
          )}
          {!!children && children}
          {!onCancel && !!onClose && <View className='close'><Text className='at-icon at-icon-close-circle' onClick={this.maskClick} /></View>}
        </View>
      </View>
    )
  }
}