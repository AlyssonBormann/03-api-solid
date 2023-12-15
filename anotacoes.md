# Explicações e Bibliotecas usadas

# Iniciando o projeto node para criar o packge.json
npm init -y

# Extensoes usadas 
npm i typescript @types/node tsx tsup -D

- O tsx é usado para converter o codigo typescript para javascript
- O node não entende codigo typescript por isso usa o tsx
- O tsup é para gerar o build do projeto para colocar em produção

# Executar o seguinte comando para gerar o tsconfig.json
npx tsc --init

- Dentro do tsconfig.json troque "target": "es2016" para "target": "es2020"

# Biblioteca para gerar a instancia do servidor node
npm i fastify

# Deixar o .gitignore previamente criado

# Criar os script no package.json
- npm run 'dev' ou 'start' ou 'build'
- O primeiro roda o projeto em desenvolvimento
- O segundo roda o projeto em produção
- O terceiro roda a build do projeto 

"dev": "tsx watch src/server.ts",
"start": "node build/server.js",
"build": "tsup src --out-dir build"

# Proximo passo configura o proprio npm
- Criar um arquivo com o nome .npmrc
- vai conter o seguinte comando save-exact=true
- Esse comando salvar a versão exata de um pacote instalado
- Pode instalar tudo de novo, vai sumir o ^ ou ~ na frente das versoes no package.json
## https://github.com/renovatebot/renovate
- Bot usado para atualizar as dependencias
- Ele atualizar a depencia, depois roda os teste no projeto, caso não der nenhum erro nos teste
  ele abre uma pull request avisando que pode atualizar a versão da dependencia

  # CONFIGURAR AS VARIAVEIS DE AMBIENTE
  # Biblioteca para carregar as varias de ambiente dentro do projeto
  npm i dotenv
  - Depois criar a pasta env e index.ts
  
  # Biblioteca zod para validar os dados
  npm i zod

  # CRIANDO OS ALIAS DE IMPORTAÇÃO
  - Ir no tsconfig.json e colocar 
    "baseUrl": "./",                 
    "paths": {
      "@/*":["./src/*"]
    }, 

# USANDO ORM PRISMA
npm i prisma -D

- ver operações comuns do prisma
npx prisma -h

- Uma dessas operações comuns que vai ter é 
npx prisma init

npx prisma generate
- criar de forma totalmente automatizada por debaixo dos panos a tipagem

# Para comecar a usar o prisma precisar instalar o seguinte
npm i @prisma/client

# Comando para jogas as tabelas ou colunas no banco de dados em desenvolvimento
npx prisma migrate dev

# Comando para jogas as tabelas ou colunas no banco de dados em producao
npx prisma migrate deploy

# Comando para abrir o prisma stuido
npx prisma studio

# Biblioteca para fazer hash de senhas
npm i bcryptjs
npm i -D @types/bcryptjs

# Biblioteca para testes e plugin para o vitest entende os paths que foi configurado no tsconfig.json
- crie um arquivo chamdo vite.config.ts
npm i vitest vite-tsconfig-paths -D

# O Vitest é uma ferramenta de testes para Node.js que oferece uma interface de usuário (UI) para monitorar o status dos testes
npm i -D @vitest/ui

## CLEANC CODE
- variaveis que retornam Bolean é com começar com => "is" "has" "does" ficam melhores verbalmente

## Quando se deparar com a varial "SUT"
- É um pattern que tem o seguinte significao: System Under Test

# pacote para datas
npm i dayjs


# pacote JWT para autenticacao
npm i @fastify/jwt

## Teste end-to-end (e2e)
- Criar uma pasta dentro de prisma chamado 'vitest-environment-prisma'
- Logo depois 'npm init -y'
- Depois de fazer a configuracao dentro dessa pasta e no arquivo vit.config.ts
- Vai no 'cd prisma/vitest-environment-prisma' e digite no termianl 'npm link'
- Depois volta na aplicacao glocal cd .., cd ..
- E Digite no terminal 'npm link vitest-environment-prisma'
# PACOTE para conseguir executar script dentro do package.json nao importanto o sistema operacional
npm install -D npm-run-all

## Dentro do package.json nos scripts, tudo que comeca com 'pre' ou 'post'
## e execultado antes de rodar o script e depois que rodar o script
## exemplo aqui e quando vai rodar o npm run test:e2e
## tem um script chamado pretest:e2e ele vai roda primeiro que o npm run test:e2e
## PROJETO-03, modulo Controllers & Testes 2e2 aula Organizando npm scripts

# pacote supertest
npm i supertest -D @types/supertest -D