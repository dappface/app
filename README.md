[![iOS Build Status][ios-build-status-svg]][ios-build-status-link]
[![Lint Status][lint-status-svg]][lint-status-link]

# DAPPFACE

🚧 **This app is in an early development stage. Bugs and major refactoring are expected.**

Web3 compatible Mobile Browser with crypto news aggrigator and swipeable tabs.

[![DEMO](https://img.youtube.com/vi/89TFedIOfeY/0.jpg)](https://www.youtube.com/watch?v=89TFedIOfeY)

## 💻 Setup

1. Follow [this page](https://facebook.github.io/react-native/docs/getting-started.html) for installing general React Native tools

2. Install more tools

```sh
$ brew install imagemagick
$ brew cask install react-native-debugger
```

3. Clone repository and install all project dependencies

```sh
$ git clone git@github.com:LukeSugiura/dappface.git
$ cd ./dappface
$ npm run install:all
```

## 📱 Run

```sh
$ npm run ios
$ npm run android

$ npm run ios configuration:release # for Release build
```

**Use different simulator**

```sh
$ npm run ios simulator:iPhone\ 11
```

**Install on device**

```sh
$ npm run ios device:true
```

[ios-build-status-svg]: https://github.com/dappface/app/workflows/iOS%20Build/badge.svg
[ios-build-status-link]: https://github.com/dappface/app/actions?workflow=iOS%20Build
[lint-status-svg]: https://github.com/dappface/app/workflows/Lint/badge.svg
[lint-status-link]: https://github.com/dappface/app/actions?workflow=Lint
