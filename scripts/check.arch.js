// scripts/check-architecture.js
const { execSync } = require('child_process');

// Pastas e arquivos protegidos
const PROTECTED_PATTERNS = [/^server\/src\/shared\//, /^client\/src\/shared\//, /^tsconfig\.json$/, /^\.eslintrc\./];

try {
  // Pega os arquivos em staging (git add)
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACMR', {
    encoding: 'utf-8',
  })
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);

  // Filtra arquivos que batem com os padrões protegidos
  // Normaliza barras invertidas do Windows (\) para (/)
  const violations = stagedFiles.filter((file) => {
    const normalizedFile = file.replace(/\\/g, '/');
    return PROTECTED_PATTERNS.some((regex) => regex.test(normalizedFile));
  });

  if (violations.length > 0) {
    console.error('\n❌ [GIT BLOCK] Alteração em arquivos protegidos de arquitetura:');
    console.error('------------------------------------------------------------------');
    violations.forEach((file) => console.error(`  - ${file}`));
    console.error('------------------------------------------------------------------');
    console.error('A pasta "shared" e os arquivos de configuração são protegidos.');
    console.error('Desfaça as alterações ou consulte o Tech Lead antes de prosseguir.\n');
    process.exit(1); // Interrompe o commit
  }

  process.exit(0);
} catch (error) {
  // Se falhar a checagem com erro de código 1 (bloqueio), repassa a saída
  if (error.status === 1) {
    process.exit(1);
  }
  console.error('Erro ao verificar arquivos de arquitetura:', error.message);
  process.exit(1);
}
