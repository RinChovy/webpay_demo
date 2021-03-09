module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      },
    ],
    'stage-0',
    'react',
  ],
  plugins: [
    'transform-class-properties',
    'transform-object-assign',
    [
      'import',
      [
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
        {
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
  ],
};
