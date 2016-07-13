import path from 'path'

const config = new Map()

config.set('path_project', path.resolve(__dirname, '..'))

config.set('dir_src', path.join(config.get('path_project'), 'src'))
config.set('dir_dist', path.join(config.get('path_project'), 'dist'))

config.set('webpack_host', process.env.HOST || 'localhost')
config.set('webpack_port', process.env.PORT || 8080)

config.set('env', process.env)
config.set('globals', {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
  NODE_ENV: process.env.NODE_ENV || 'development',
  __DEV__: process.env.NODE_ENV === 'development',
  __PROD__: process.env.NODE_ENV === 'production',
  __DEBUG__: process.env.NODE_ENV === 'development' && parseInt(process.env.DEBUG, 10) === 1,
  TEST_ENV: process.env.CI ? 'ci' : (process.env.TEST_ENV || 'single'),
  __BASE__: process.env.BASE || '',
})

config.set('webpack_public_path',
  `http://${config.get('webpack_host')}:${config.get('webpack_port')}/`
)

export default config
