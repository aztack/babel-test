const babel = require('babel-core')
const t = babel.types
const traverse = babel.traverse
const template = babel.template
const generate = require('babel-generator').default

const babylon = require('babylon')

const code = `
import A from 'a'
import B from 'b'

export default {
  components: {

  },
  methods: {
    init () {

    }
  }
}
`
const ast = babylon.parse(code, {sourceType: 'module'})
var n = []
traverse(ast, {
  ImportDeclaration: {
    exit(path) {
      n.push(path)
    }
  }
})

const name = 'UserDialog', src = './user-dialog.vue'
if (n.length) {
  const importAst = template(`import ${name} from "${src}"`, {sourceType: 'module'})()
  // append to last import statement
  n[n.length - 1].insertAfter(importAst);
  console.log(generate(ast).code)
}

