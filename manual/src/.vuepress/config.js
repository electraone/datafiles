const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Electra One Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    nav: [
      { text: 'HOME', link: 'https://electra.one/' },
      { text: 'APP & PRESETS', link: 'https://app.electra.one/' },
      { text: 'DOCUMENTATION', link: '/' }
    ],
    search: false,
    repo: '',
    editLinks: false,
    activeHeaderLinks: true,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebar:
      {
        '/': [
          {
            title: 'User Guide',
            collapsable: true,
            sidebarDepth: 2,
            displayAllHeaders: true,
            children: [
              '/',
              '/overview.md',
              '/concept.md',
              '/devices.md',
              '/userinterface.md',
              '/routing.md',
              '/extcontrol.md',
              '/editor.md',
              '/electraoneconsole.md'
            ]
          },
          {
            title: 'Downloads',
            collapsable: true,
            sidebarDepth: 0,
            displayAllHeaders: true,
            children: [
              '/downloads/firmware.md',
              '/downloads/hostapps.md'
            ]
          },
          {
            title: 'Troubleshooting',
            collapsable: true,
            sidebarDepth: 1,
            displayAllHeaders: true,
            children: [
              '/troubleshooting/hardrestart.md',
              '/troubleshooting/connectionissues.md'
            ]
          },
          {
            title: 'Tutorials',
            collapsable: true,
            sidebarDepth: 0,
            displayAllHeaders: true,
            children: [
              '/tutorials/abletonvst.md',
              '/tutorials/launchpad.md',
              '/tutorials/sysextemplates.md'
            ]
          },
          {
            title: 'Developers',
            collapsable: true,
            sidebarDepth: 2,
            displayAllHeaders: true,
            children: [
              '/developers/midiimplementation.md',
              '/developers/presetformat.md',
              '/developers/controltypes.md',
              '/developers/confformat.md',
              '/developers/sysexparser.md',
              '/developers/lua.md'
            ]
          }
        ]
      }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'note',
        before: info => `<div class="note"><p class="title">${info}</p>`,
        after: '</div>',
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'functiondesc',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'params',
        before: info => `<div class="params"><p class="paramstitle">${info}</p>`,
        after: '</div>',
      }
    ],
    [
      'google-gtag',
      {
        'ga': 'G-38HXGB5R4B' // UA-00000000-0
      }
    ],
    [
      'google-gtag',
      {
        'ga': 'G-3RT2C0SGM2' // UA-00000000-0
      }
    ]
  ]
}
