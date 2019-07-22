module.exports = {
  presets: [
    ['@babel/preset-react'],
    ['@babel/preset-env']
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'emotion',
    '@babel/transform-runtime'
  ]
}
