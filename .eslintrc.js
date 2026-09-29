module.exports = {
  plugins: ['boundaries'],
  settings: {
    'boundaries/elements': [
      { type: 'shared', pattern: 'src/shared/**/*' },
      { type: 'domain', pattern: 'src/domain/**/*' },
      { type: 'application', pattern: 'src/application/**/*' },
      { type: 'infrastructure', pattern: 'src/infrastructure/**/*' },
      { type: 'presentation', pattern: 'src/presentation/**/*' },
    ],
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          // 1. SHARED: Não depende de nenhum módulo de negócio
          { from: 'shared', allow: ['shared'] },

          // 2. DOMAIN: Consome apenas o shared puro e outros domínios
          { from: 'domain', allow: ['shared', 'domain'] },

          // 3. APPLICATION: Consome domain e shared
          { from: 'application', allow: ['shared', 'domain', 'application'] },

          // 4. INFRASTRUCTURE & PRESENTATION: Consomem os níveis superiores
          { from: 'infrastructure', allow: ['shared', 'domain', 'application', 'infrastructure'] },
          { from: 'presentation', allow: ['shared', 'domain', 'application', 'presentation'] },
        ],
      },
    ],
  },
};
