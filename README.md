<h1 align="center">Welcome to dotenv-types-generator 👨‍💻</h1>
<p>
  <a href="https://twitter.com/saul_mal" target="_blank">
    <img alt="Twitter: saul_mal" src="https://img.shields.io/github/workflow/status/saulmaldonado/dotenv-types-generator/CI" />
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/saul_mal" target="_blank">
    <img alt="Twitter: saul_mal" src="https://img.shields.io/twitter/follow/saul_mal.svg?style=social" />
  </a>
  
</p>

[dotenv-types-generator](https://github.com/saulmaldonado/dotenv-types-generator) is a command line tool for automatically generating type declarations files (.d.ts) for your .env files

## Getting Started

```sh
npx dotenv-types-generator

# Or using Yarn 2.x
yarn dlx license
```

By default, a .env file is expected in root of the project. To specify path a the .env file, use the --file or -f flag

```sh
npx dotenv-types-generator -f [path/to/file/.env]

# Or using Yarn 2.x
yarn dlx license -f [path/to/file/.env]
```

## Options

|                   | flag                         | alias                    |
| ----------------: | ---------------------------- | ------------------------ |
| Path to .env file | `--file [path/to/file/.env]` | `-f [path/to/file/.env]` |
|              help | `--help`                     | `-h`                     |
|           version | `--version`                  | `-v`                     |

## Install

```sh
git clone https://github.com/saulmaldonado/dotenv-types-generator.git

npm run build
# or
yarn build

npm link
# or
yarn link

npm link dotenv-types-generator
# or
yarn link dotenv-types-generator
```

## Run tests

```sh
yarn test
# or
npm run test
```

## Author

👤 **Saul Maldonado**

- Website: https://saulmaldonado.tech/
- Twitter: [@saul_mal](https://twitter.com/saul_mal)
- Github: [@saulmaldonado](https://github.com/saulmaldonado)
- LinkedIn: [@saulmaldonado4](https://linkedin.com/in/saulmaldonado4)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
