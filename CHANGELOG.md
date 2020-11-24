# Change Log

## v1.1.1 - 2020-11-24

Bumped dependencies 📦

## Notable Changes

- `yargs` `16.0.3` -> `16.1.1`
- `@babel/core` `7.11.6` -> `7.12.8`
- `@babel/preset-env` `7.11.5` -> `7.12.7`
- `eslint` `7.9.0` -> `7.14.0`
- `eslint-config-airbnb-base` `14.2.0` -> `14.2.1`
- `eslint-config-prettier` `6.12.0` -> `6.15.0`
- `eslint-plugin-jest` `24.0.2` -> `24.1.3`
- `jest` `26.4.2` -> `26.6.3`
- `lint-staged` `>=10` -> `>=10.5.2`
- `prettier` `2.1.2` -> `2.2.0`
- `rollup` `2.28.2` -> `2.33.3`

---

## v1.1.0 - 2020-10-09

## Notable Changes

### New CLI Options

- `--optionalTypes`/`-o` (#5)
  - Set all types in the resulting `env.d.ts` to optional/nullable
- `--mergeTypes` / `-m` (#10)
  - Merge with types from an existing `env.d.ts` file
- `--defaults PROP1 PROP2 PROP3` / `-d PROP1 PROP2 PROP3` (#11)
  - Explicitly include a project's default `process.env` properties
- `--indentationSize [number]` / `-i [number]` (#8)
  - Manually format the resulting `env.d.ts` indentation size in spaces.

---

## v1.0.1 - 2020-09-28

Smaller package size!

### Changes

- remove local gif from README, replace with hosted gif [622486a](https://github.com/saulmaldonado/dotenv-types-generator/commit/622486adba8854c573862225788f2bc76630efb6)

---

## v1.0.0 - 2020-09-26

Initial release 🚀
