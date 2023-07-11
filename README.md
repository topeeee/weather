# Task

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-query](https://tanstack.com/query/v3/) for state management.

## Usage


- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npx react-native run-ios` or `npx react-native run-android` to start your application!


## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `components`: Folder to store any common component that you use through your app
  - `navigations`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
      - `ForecastScreen.tsx`
      - `HomeScreen.tsx`
   
  - `App.tsx`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.
