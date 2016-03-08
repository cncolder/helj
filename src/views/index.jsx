import Layout from './layout'
import React from 'react'
import ReactDOMServer from 'react-dom/server'


export default class extends React.Component {
  render() {
    return (
      <Layout>
        <div id="client">
          <div className="weui_loading_toast">
            <div className="weui_mask_transparent"></div>
            <div className="weui_toast">
              <div className="weui_loading">
                <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                <div className="weui_loading_leaf weui_loading_leaf_11"></div>
              </div>
              <p className="weui_toast_content">连接服务器...</p>
            </div>
          </div>
        </div>
        <script src="/js/vendor.js"></script>
        <script src="/js/client.js"></script>
      </Layout>
    )
  }
}
