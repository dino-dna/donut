import React from 'react'
import Markdown from 'react-remarkable'

const md = `
# donut

This is \`donut\`'s storybook.  A storybook is a composition of many stories.  A story is a single state of one or more UI components. You can have as many stories as you want. Basically a story is like a visual test case.  Check out the stories inside the \`src/<component>/\` directories.

You can also edit components and see changes right away.  This is just one thing you can do with Storybook.  Have a look at the react-storybook project for more information.
`

export default class Welcome extends React.Component {
  showApp (e) {
    e.preventDefault()
    if (this.props.showApp) this.props.showApp()
  }

  render () {
    return (
      <div style={{padding: '2em'}}>
        <Markdown>{md}</Markdown>
      </div>
    )
  }
}
