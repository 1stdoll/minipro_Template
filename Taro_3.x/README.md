##p-r

#P+R地铁沿线停车资源整合项目_小程序

- 选用TARO 3.x框架
- 选用TARO UI的组件插件
- 封装适用改版框架的小程序更新检查方法（update.js 默认方法 app.js已引入 UDM）
- 封装适用该框架的网络请求方法（request.js 默认方法）
- 封装项目内部页面跳转事件（pathRouter.js pageTo方法）【该方法需要页面创建格式为 $pagename$/index,也可设置参数type=2使用完整路径跳转】
- 封装可用于网络请求获取的可配置跳转事件（pathRouter.js pathRouter方法）
- 封装支付请求方法【支付宝小程序支付、微信支付】（payHandle.js PayHandle方法）
- 由于网络时间处理插件moment.js文件过大，封装时间处理方法（utils.js moment方法）
- 封装富文本内容处理方法，配合mini-html-parser2的parse方法使用可以适用RichText组件（utils.js replaceHtml方法）
- 封装了超链接参数提取方法（utils.js pathParams方法）
- 安装了dva依赖，models文件请直接添加在models文件夹中，会自动生效
- 已添加了popup，model，divider组件，使用前请先查看文件
- 已添加了扫码处理方法(scan.js),请将关联二维码的扫码逻辑写在这个文件中，并在小程序后台配置关联二维码的规则的时候选择小程序首页
- 已添加了全局登录、验证登录的方法(login.js),新规则请直接在这之中修改

- 添加了自开发的虚拟列表,与Taro官方提供的虚拟列表组件不同的是,列表一项在列表中的位置为单独定位通过TOP实现,需要在itemSize字段中传入每项的高度(统一高度时直接传入单项的高度[rpx],高度不同时传入所有用到的高度数组[rpx],并在格式化时在每项数据中加入size字段[对应高度数组的下标])

- 安装依赖时可直接在项目下安装@tarojs/cli框架文件应用最新版本开发框架（cnpm i @tarojs/cli）
- 安装其他依赖时请用-save命令添加到package.json文件中

##【PS】
由于taro打包过程中会将引用的方法代码打包到引入文件中【已证实】<br>
重复利用的开发插件方法或自定义方法请先引入到app.js文件，再在页面文件中通过getApp使用【未证实】<br>
由于taro打包过程中会将引用的图片以base64的格式引入到所有引入的文件中，大体积图片请使用网络链接的方式添加到页面中【已证实】<br>


#更新日志（只记录完整功能的更新记录）
##2021年4月1日 11:34:42
更新了virtual-list,switch,swipeAction,radio,picker,avatar组件
更新了login.js全局登录验证方法
更新了scan.js扫码逻辑方法

##2021年1月25日 11:07:15
更新框架内容