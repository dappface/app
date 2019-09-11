# DAPPFACE

🚧 **This app is in an early development stage. Bugs and refactoring are expected.**

Web3 compatible Mobile Browser with crypto news aggrigator and swipeable tabs.

[![DEMO](https://img.youtube.com/vi/89TFedIOfeY/0.jpg)](https://www.youtube.com/watch?v=89TFedIOfeY)

## 💻 Install Dependencies

### nodebrew

If you've already installed node with installer...

Uninstall node.

Install nodebrew with curl.

```sh
$ curl -L git.io/nodebrew | perl - setup
```

Add PATH setting your shell config file (.bashrc or .zshrc).

```sh
export PATH=$HOME/.nodebrew/current/bin:$PATH
```

Reload config.

```sh
$ source ~/.bashrc
```

### node v10.15.3

Install binary for v10.15.3.

```sh
$ nodebrew install-binary v10.15.3
```

Use installed binary.

```sh
$ nodebrew use v10.15.3
```

### Homebrew

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### watchman

```sh
$ brew install watchman
```

### Xcode

Install from [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=13).

### Xcode Command Line Tools

[Instruction](https://facebook.github.io/react-native/docs/getting-started.html#command-line-tool)

### CocoaPods

```sh
$ brew install cocoapods
$ pod repo update

### ImageMagic

```sh
$ brew install imagemagick
```

### React Native Debugger

```sh
$ brew update && brew cask install react-native-debugger
```

## 🛠 Build

Clone repository.

```sh
$ git clone git@github.com:LukeSugiura/dappface.git
```

Move to project dir.

```sh
$ cd ./dappface
```

Install dependencies and setup.

```sh
$ npm i
```

### IOS

Build for development.

```sh
$ npm run ios

// Use different simulator
$ SIMULATOR='iPhone X' npm run ios
```

Build for release.  
Build in Xcode.

### Android

Build for development.

```sh
$ npm run android
```

Build for release.

```sh
// TODO
```
