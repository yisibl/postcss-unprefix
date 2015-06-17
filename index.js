var postcss = require('postcss')
var properties = require('./properties')
var autoprefixer = require('autoprefixer')

var rePrefix = /^-webkit-|^-moz-(osx-)?|^-ms-|^-o-/i

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

      // console.log(unPrefixProp, 'unPrefixProp')

      //TODO? values.indexOf(unPrefixValue)
      // Like display: -webkit-box don't create display: box
      if (properties.indexOf(unPrefixProp) === -1) {
        return
      }

      // if (noPrefix.indexOf(unPrefixProp) > -1){
      //   return
      // }

      if (decl.prop.match(rePrefix) || decl.value.match(rePrefix)) {
        decl.cloneAfter({
          prop: unPrefixProp,
          value: unPrefixValue
        })
      }
    })

    css.eachRule(removeRepeatDecl)

    //TODO: browsers opts
    // Use Autprefixer add prefix
    var browsers = { browsers: ['last 2 versions', 'firefox > 9', 'opera >= 11.5', 'ie >= 9']}
    postcss([ autoprefixer(browsers) ]).process(css).then(function (result) {
    result.warnings().forEach(function (warn) {
        console.warn(warn.toString());
    });
});
  }
})
