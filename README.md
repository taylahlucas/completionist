# Completionist
An app designed for game completionists which allows them to track their progress in various games.

# Setup

- cd completionist
- npm install
- npm start

npx react-native run-ios --port 8002

## Backend

- cd backend
- npm install
- node server.js

# Packages

- styled-components
- @types/styled-components-react-native
- react-native-vector-icons
- @types/react-native-vector-icons
- @tsconfig/react-native

- @react-navigation/native
- @react-navigation/drawer
- @react-navigation/native-stack
- react-native-reanimated
- react-native-gesture-handler

- babel-plugin-module-resolver
- babel-cli
- babel-present-env
- react-native-dotenv
- @babel/node

- react-redux
- @reduxjs/toolkit
- redux-logger && @types/redux-logger
- react-dom

- @react-native-google-signin/google-signin
- @react-native-firebase/auth

- @apollo/client

- @react-native-async-storage/async-storage

- react-native-gif
- uuid
- @types/uuid

- i18next-http-backend
- i18n
- react-i18next
- react-native-localize
- i18next-browser-languagedetector
- glob
- lodash
- @types/lodash
- moment

## Backend

- mongoose
- express
- dotenv
- jsonwebtoken
- mongoose
- express
- body-parser
- express-session
- passport
- poassport-google-oauth20
- crypto
- nodemailer


## Updating translations

Pull from master:
- git submodule foreach git pull origin branch_name
-- Need to change 'translations' back to 'Completionist-Translations'

Update:
- git submodule update --init --recursive --remote translations

Confirm:
- npm run generate-locale


- Translations in categories.json must match the name of the category in camel case.

