import createHistory from 'history/lib/createHashHistory'
import useQueries from 'history/lib/useQueries'

export default useQueries(createHistory)({
  // queryKey is used for pushState and popstate event in HTML5 History API.
  // We don't need this.
  // http://rackt.org/history/stable/HashHistoryCaveats.html
  queryKey: false
})
