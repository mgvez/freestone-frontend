# Notes

## eslint

on doit utiliser babel-eslint (voir le parser dans .eslintrc)

## babel

Les presets de babel sont utilisés. Voir .babelrc, et les presets installés par npm (package.json), en particulier les presets de stage (par ex. https://babeljs.io/docs/plugins/preset-stage-0/)

Les decorators ne sont pas suportés par Babel 6 (as of 2015-12-22) mais un plugin existe: 
```npm i babel-plugin-transform-decorators-legacy -D```
et voir ensuite dans .babelrc

## builder

webpack --verbose --colors --display-error-details --config webpack/prod.config.js