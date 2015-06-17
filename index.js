var postcss = require('postcss')
var properties = require('./properties')

var rePrefix = /^-webkit-|^-moz-|^-ms-|^-o-/gi

module.exports = postcss.plugin('postcss-unprefix', function() {
  //删除重复生成的声明
  function removeRepeatDecl(rule, i) {
    rule.eachDecl(function(decl, i) {
      var n = 0
      decl.parent.eachDecl(function(decla) {
        if (decl.prop === decla.prop && decl.value === decla.value) {
          n++
        }
      })
      if (n > 1) {
        decl.removeSelf()
      }
    })
  }

  return function(css) {
    css.eachDecl(function(decl) {
      //替换成不带前缀的属性或属性值
      var unPrefixProp = decl.prop.replace(rePrefix, '')
      var unPrefixValue = decl.value.replace(rePrefix, '')

      //TODO? values.indexOf(unPrefixValue)
      // Like display: -webkit-box don't create display: box
      if (properties.indexOf(unPrefixProp) === -1) {
        return
      }

      if (decl.prop.match(rePrefix) || decl.value.match(rePrefix)) {
        decl.cloneAfter({
          prop: unPrefixProp,
          value: unPrefixValue
        })
      }
    })

    css.eachRule(removeRepeatDecl)

  }
})
