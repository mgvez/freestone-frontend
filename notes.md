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

## update submodule dans backend

git submodule foreach git pull origin master

## analytics widget

setup google API access : https://developers.google.com/api-client-library/javascript/start/start-js#setup

If you don't know your profile ID, please open the Google Analytics website, login, and select the website you want to monitor with PRTG.
In your web browser's URL field you will see content similar to this:
https://www.google.com/analytics/web/#report/visitors-overview/a5559982w55599512p12345678

Please note the structure at the end of the URL:
/a[6 digits]w[8 digits]p[8 digits]

The 8 digits that follow the "p" are your profile ID.