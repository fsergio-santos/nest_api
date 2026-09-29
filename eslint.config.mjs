import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Bloco 1: Define quais arquivos e pastas o ESLint DEVE IGNORAR totalmente
  {
    ignores: ['eslint.config.mjs', 'dist/', 'node_modules/'],
  },

  // Bloco 2: Regras recomendadas de JavaScript
  eslint.configs.recommended,

  // Bloco 3: Regras avançadas com verificação de tipo para TypeScript
  ...tseslint.configs.recommendedTypeChecked,

  // Bloco 4: Plugin do Prettier (já configura o plugin e desativa regras conflitantes)
  eslintPluginPrettierRecommended,

  // Bloco 5: Configuração de ambiente e parser
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Bloco 6: Regras customizadas do projeto
  {
    rules: {
      // --- TypeScript / NestJS ---
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',

      // --- Boas Práticas e Qualidade ---
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
      'no-dupe-args': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // Impede variáveis/funções sem uso
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // --- Prettier (alocado DENTRO de rules e com parser typescript) ---
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'typescript',
        },
      ],
    },
  },
);
