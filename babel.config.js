const presets = [
    ['@babel/env', { // какой пресет использовать
      targets: { // какие версии браузеров поддерживать
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      },
      useBuiltIns: "entry"
    }]
];

const plugins = [
  [
    "@babel/plugin-proposal-class-properties"
  ]
]
  
module.exports = { presets, plugins };