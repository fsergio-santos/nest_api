// src/shared/infrastructure/i18n/i18n.module.ts
import { Global, Module } from '@nestjs/common';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'pt-BR',
      fallbacks: {
        'pt-*': 'pt-BR',
        'en-*': 'en',
        'es-*': 'es',
      },
      loaderOptions: {
        path: path.join(__dirname),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [
        new QueryResolver(['lang', 'l']), // ?lang=es ou ?lang=en
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver, // Lê cabeçalho padrão: Accept-Language: pt-BR, en;q=0.9, es;q=0.8
      ],
    }),
  ],
  exports: [I18nModule],
})
export class I18nCustomModule {}
