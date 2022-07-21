import hasRole from './hasRole'
import hasPermi from './hasPermi'
import filterInput from './filterInput'
const install = (Vue) => {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
  Vue.directive('enterNumber', filterInput)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  window['enterNumber'] = filterInput

  Vue.use(install); // eslint-disable-line
}

export default install
