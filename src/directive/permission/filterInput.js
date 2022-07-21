export default {
  inserted: (el) => {
    el.addEventListener('keypress', (e) => {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (charcode === 46) {
        if (e.target.value.includes('.')) {
          e.preventDefault()
        }
        return
      } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
}
