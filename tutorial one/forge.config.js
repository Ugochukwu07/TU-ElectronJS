module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    // Other platform makers (e.g., for Windows, macOS)
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Your Name <your.email@example.com>',
          homepage: 'https://example.com',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Your Name <your.email@example.com>',
          homepage: 'https://example.com',
        },
      },
    },
  ],
};
