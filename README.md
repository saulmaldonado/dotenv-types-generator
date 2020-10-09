<h1 align="center">dotenv-types-generator 👨‍💻</h1>
<p>
  <a href="https://github.com/saulmaldonado/dotenv-types-generator" target="_blank">
    <img alt="CI Build" src="https://img.shields.io/github/workflow/status/saulmaldonado/dotenv-types-generator/CI" />
  </a>
  <a href='https://codecov.io/gh/saulmaldonado/dotenv-types-generator' target='_blank'>
    <img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/saulmaldonado/dotenv-types-generator" />
  </a>
  <a href='https://www.npmjs.com/package/dotenv-types-generator' target='_blank'>
    <img alt="Version" src="https://img.shields.io/npm/v/dotenv-types-generator" />
  </a>
  <a href="https://github.com/saulmaldonado/dotenv-types-generator/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

[dotenv-types-generator](https://github.com/saulmaldonado/dotenv-types-generator) is a command line tool for automatically generating type declarations files (.d.ts) for your .env files

### Get the benefits of a strongly typed .env file

![demo](https://i.imgur.com/wrIZMUi.gif)

## Getting Started

```sh
npx dotenv-types-generator

# Or using Yarn 2.x
yarn dlx dotenv-types-generator
```

By default, a .env file is expected in the root directory of the project. To specify a path, use the **--file** or **-f** flag

```sh
npx dotenv-types-generator -f [path/to/file/.env]

# Or using Yarn 2.x
yarn dlx dotenv-types-generator -f [path/to/file/.env]
```

## Options

|                                              | flag                           | alias                  | default value |
| -------------------------------------------: | ------------------------------ | ---------------------- | ------------- |
|                        **Path to .env file** | `--file path/to/file/.env`     | `-f path/to/file/.env` | `./.env`      |
|                  **Optional/Nullable Types** | `--optionalTypes`              | `-o`                   | `false`       |
|      **Merge with existing `env.d.ts` file** | `--mergeTypes`                 | `-m`                   | `false`       |
| **Include project's default env properties** | `--defaults PROP1 PROP2 PROP3` | `-d PROP1 PROP2 PROP3` |               |
|           **File Indentation Size (spaces)** | `--indentationSize`            | `-i`                   | `2`           |
|                                  **version** | `--version`                    | `-v`                   |               |
|                                     **help** | `--help`                       | `-h`                   |               |

## Development installation

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

## Contribute

Issues and PRs are welcome!
See [CONTRIBUTING.md](https://github.com/saulmaldonado/dotenv-types-generator/blob/master/CONTRIBUTING.md)

## Contributors

<a href="https://github.com/saulmaldonado/dotenv-types-generator/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=saulmaldonado/dotenv-types-generator" />
</a>

## Show your support

Give a ⭐️ if this project helped you!

---
