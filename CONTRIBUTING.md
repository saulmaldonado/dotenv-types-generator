> ## ⚠ Refrain from spamming PRs
>
> Hacktoberfest PRs are encouraged. Any PRs that are automated, disruptive, hindering or clearly a cheap attempt for a +1 PR will be marked as "spam" and "invalid" [https://hacktoberfest.digitalocean.com/details](https://hacktoberfest.digitalocean.com/details)

Contributions are always welcome, no matter how large or small! Documentation additions/changes, code refactors PRs and can be submitted without opening an issue.

# First Time Open Source Contributors

Don't know where to start? Watch this online course!
[https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

# Contributing

1. [Fork it](https://help.github.com/articles/fork-a-repo/)
2. Clone
3. Install dependencies (`npm install`)
4. Link (`npm link && npm link dotenv-types-generator`)
5. Test with an example `.env` file (`dotenv-types-generator` in project root)
6. Make changes
7. If adding features or making fixes, write tests for your changes using [Jest](https://jestjs.io/en/).
8. Test your project. ensure 100% code coverage (`npm test --coverage`)
9. Stage and commit (`pre-commit` hook with lint and format your changes. Address any linting errors if necessary)
10. Push and [Create new Pull Request](https://help.github.com/articles/creating-a-pull-request/)

## Yargs

We use Yargs to build the CLI tool. If you wish to add options or extensions, familiarize yourself with building CLI tools with Yargs [https://github.com/yargs/yargs](https://github.com/yargs/yargs)

## Testing

We use [Jest](https://jestjs.io/en/) to write tests:

```
npm test
```
