import { createElement as h } from 'react'

function App() {
  return h(
    'main',
    { className: 'app-shell' },
    h(
      'section',
      { className: 'hero-card' },
      h('p', { className: 'eyebrow' }, 'React Starter'),
      h('h1', null, 'New project ready for building.'),
      h(
        'p',
        { className: 'body-copy' },
        'Start editing ',
        h('code', null, 'src/App.js'),
        ' to shape your app.',
      ),
    ),
  )
}

export default App
