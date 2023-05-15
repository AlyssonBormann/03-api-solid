# Usando o Eslint

# Instalando a configuracao do eslint da rocktseat
npm i eslint @rocketseat/eslint-config -D

- criar um arquivo chamado .eslintrc.json
- e adicionar no arquivo
{
  "extends":[
    "@rocketseat/eslint-config/node"
  ]
}
- criar um arquivo .eslintignore
- para nao corrigir os arquivos da pasta build e node_modules