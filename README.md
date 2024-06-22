## Currency converter app

A simple currency conveter app with

- Eslint/Prettier/Typescript configured
- React Navigation integrated
- RTK for a better redux state management
- RTK queries together with redux-persist for offline-support (you can test it by turning off network connection)

### Instructions

- Install dependencies and start the server

```
yarn && yarn start
```

- Run iOS

```
yarn pod
yarn ios
```

- Run Android

```
yarn android
```

- For linting (can be extended to be used in CI/CD and pre-commit)

```
yarn lint
```

### Project structure

Manage custom android code
/android

Manage custom iOS code
/ios

Manage Typescript layer code
/src

--/components # app level common components
--/hooks # app level common hooks
--/theme # theme related global config such as fonts and colors

--/features # each feature should be modularized here for
--/--/screens # feature level screens
--/--/components # feature level common components
