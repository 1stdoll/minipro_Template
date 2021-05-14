const files = require.context('.', false, /\.js$/)
let modules = []
files.keys().forEach(i => {
  if (i !== './index.js') modules.push(files(i).default)
})
export default [...modules];