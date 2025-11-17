# Completionist

An app designed for game completionists which allows them to track their progress in various games.

NOTE: Currently only available on localhost. Must have .env file to run.

[demo-1.1.mov.zip](https://github.com/user-attachments/files/23588352/demo-1.1.mov.zip)

# Setup & Run Locally

- cd completionist
- npm install
- npm start

npx react-native run-ios --port 8002

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

- @testing-library/react-native
- @testing-library/jest-native
- jest
- @types/jest
- jest-react-native
- babel-jest
- react-test-renderer
- jest-styled-components
- ts-jest
- @babel/preset-typescript
- babel-plugin-styled-components
- ts-node
- axios-mock-adapter
- axios-cache-interceptor

- @stripe/stripe-react-native

## Updating translations

Confirm:

- npm run generate-locale

- Translations in categories.json must match the name of the category in camel case.

From MonoRepo (No longer in use)
Pull from master:

- git submodule foreach git pull origin branch_name
  -- Need to change 'translations' back to 'Completionist-Translations'

Update:

- git submodule update --init --recursive --remote translations

## Steps for adding new game DB

- Create a .json file with data for game, ensuring "sections" represents the correct value for "quests", "collectables", "locations", "miscellaneous".
- Check for duplicate ids.
- Translate to different languages on https://translate.i18next.com.
- Ensure all sections 'quests, collectables, locations, miscellaneous' are converted to english.
- Ensure there are no duplicate ids by running /backend/scripts/update_duplicate_ids.
- Create gameSettingsConfig in initialUserData.js.
- Update user.js model with new game in data and subscription.data.
- Add image to styles/images/games/.
- In CustomEnums add the new game.
- Create migration to mirate new game info to existing users.
- Generate hrefs using add_initial_hrefs.js
- Check for hrefs that dont work using check_hrefs.js and update these.
- Move add_new_hrefs.js to translations/ and run for files with finished hrefs.

## References

Payment Tiers:

LARGE => 100+ Quests

MEDIUM => 50 - 99 Quests

SMALL => < 50 Quests

DynamoDB & Node.js -> https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html

Mock test card number: 4242 4242 4242 4242
