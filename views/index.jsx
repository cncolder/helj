import Layout from './layout'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <div id="client"></div>
        <script src="/js/vendor.js"></script>
        <script src="/js/client.js"></script>
      </Layout>
    )
  }
}
