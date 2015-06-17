var fs = require("fs")
var test = require("tape")
var postcss = require("postcss")
var plugin = require("..")

function filename(name) { return "test/" + name + ".css" }
function read(name) { return fs.readFileSync(name, "utf8") }

function compareFixtures(t, name, msg, opts, postcssOpts) {
  postcssOpts = postcssOpts || {}
  //input
  postcssOpts.from = filename("fixtures/" + name + "/input")
  opts = opts || {}
  var actual = postcss()
  .use(plugin(opts))
  .process(read(postcssOpts.from), postcssOpts)
  .css
  //output
  var output = read(filename("fixtures/" + name + "/output"))
  //actual
  fs.writeFile(filename("fixtures/" + name + "/actual"), actual)
  t.equal(actual.trim(), output.trim(), msg)
}

test("@custom-selector", function(t) {
  compareFixtures(t, "one", "必须生成新的不带前缀的标准属性")
  t.end()
})
