import { configure } from '@kadira/storybook'
import '../src/index.css'

const req = require.context('../src/', true, /.stories.js$/)
const rootReq = require.context(__dirname, true, /.stories.js$/)
function loadStories () {
  rootReq.keys().forEach(f => rootReq(f))
  req.keys().sort().forEach((f) => req(f))
}
configure(loadStories, module)
