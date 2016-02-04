var postcss = require('postcss')
var properties = require('./properties')
var flexboxfixer = require('postcss-flexboxfixer')
var gradientfixer = require('postcss-gradientfixer')

var rePrefix = /^-webkit-|^-moz-(osx-)?|^-ms-|^-o-/i

module.exports = postcss.plugin('postcss-unprefix', function() {
  //删除重复生成的声明
  function removeRepeatDecl(rule, i) {
    rule.walkDecls(function(decl, i) {
      var n = 0
      decl.parent.walkDecls(function(decla) {
        if (decl.prop === decla.prop && decl.value === decla.value) {
          n++
        }
      })
      if (n > 1) {
        decl.remove()
      }
    })
  }

  return function(css) {
    css.walkDecls(rePrefix, function(decl) {
      //替换成不带前缀的属性或属性值
      var unPrefixProp = decl.prop.replace(rePrefix, '')
      var unPrefixValue = decl.value.replace(rePrefix, '')

      // console.log(unPrefixProp, 'unPrefixProp')

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

    // Use flexboxfixer add prefix
    postcss()
    .use(flexboxfixer)
    .use(gradientfixer)
    .process(css).css

    css.walkRules(removeRepeatDecl)
  }
})
