/**
 * Production environment special function
 *
 * TODO special function need special test carefully
 */

if ('production' == process.env.NODE_ENV) {
  /**
   * Track JavaScript errors fired by your visitor's browsers.
   *  https://github.com/Lapple/ErrorBoard#browser-snippet
   */

  window.onerror = (message, url, line, column, error) => {
    let e = encodeURIComponent(
        new Image()).src = '/browser-error' +
      '?message=' + e(message) +
      '&url=' + e(url) +
      '&line=' + e(line) +
      (column ? '&column=' + e(column) : '') +
      (error && error.stack ? '&stack=' + e(error.stack) : '')
  }


  /**
   * Check if a new cache is available on page load.
   *  http://www.html5rocks.com/zh/tutorials/appcache/beginner/
   */

  window.addEventListener('load', e => {
    applicationCache.addEventListener('updateready', e => {
      if (applicationCache.status == applicationCache.UPDATEREADY) {
        // Browser downloaded a new app cache.
        // Swap it in and reload the page to get the new hotness.
        applicationCache.swapCache()
        location.reload()
      }
    }, false)
  }, false)
}
