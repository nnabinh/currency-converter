## ℹ️ Currency converter app

A simple currency conveter app with

- Node v20 is required
- Eslint/Prettier/Typescript configured
- React Navigation integrated
- RTK for a better redux state management
- RTK queries together with redux-persist for offline-support (you can test it by turning off network connection)

## 💫 Demo

- Functional recording

  https://github.com/nnabinh/currency-converter/assets/10094591/7724dab7-0e0a-4adc-bbd6-fe35867c443c

- Offline behavior - the app is still working fine and will display an error if the user tries to refetch without internet connection

  <img width="295" src="https://github.com/nnabinh/currency-converter/assets/10094591/d4e304eb-5717-463d-9dea-c1ebe2abd29f">

## 🧱 Project structure

Manage custom android code
```
/android
```

Manage custom iOS code
```
/ios
```

Manage Typescript layer code
```
/src

--/components # app level common components
--/hooks # app level common hooks
--/theme # theme related global config such as fonts and colors

--/features # each feature should be modularized here for
--/--/screens # feature level screens
--/--/components # feature level common components
```

## 📲 Instructions

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
