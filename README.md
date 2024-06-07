# Personal Chef

Este app foi desenvolvido com o objetivo de aprender a utilizar de forma prática as APIs do Google e da OpenAI, além de empregar as tecnologias Angular e Ionic como já é de costume.

## Ambiente de desenvolvimento

Esta aplicaçao pode ser desenvolvida dentro de um ambente docker, o que isola e facilita o desenvolvimento.

### 1. Instalando o Docker

Primeiramente, certifiquese de ter o docker instalado em seu computador. Caso não saiba como fazer isso você pode encontrar mais informações nesse link https://letmegooglethat.com/?q=como+instalar+o+docker%3F.

### 2. Subindo o container

Para iniciar a aplicação no seu localhost, você só precisa executar o comando a seguir:

```bash
docker compose up -d
```

### 3. Interagir com o gerenciador de pacotes

Como a aplicação neste momento estará rodando dentro de um container do Docker, para utilziar o genrenciador de pacotes (NPM), vamos precisar interagir da seguinte forma:

docker compose exec app + "comando para gerenciar pacotes"

#### Instalar um novo pacote

```bash
docker compose exec app npm install nomeDoNovoPacote
```

#### Rodar script

Para rodar o script _build_ que está definido no package.json, você deve interagir da seguinte forma:

```bash
docker compose exec app npm run build
```
