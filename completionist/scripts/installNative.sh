# #!/bin/bash

# ENV_FILE="./docker/compose/.env"

# # Check if the .env file exists and source it
# if [ -f "$ENV_FILE" ]; then
#     source "$ENV_FILE"
# else
#     echo "The .env file was not found at $ENV_FILE."
#     exit 1
# fi

# # Check if NODE_VERSION is set and not empty
# if [ -z "$NODE_VERSION" ]; then
#     echo "NODE_VERSION is not set in the .env file."
#     exit 1
# fi

# readonly REQUIRED_NODE_VERSION="$NODE_VERSION"
# readonly REQUIRED_POD_VERSION="1.14"
# readonly REQUIRED_JAVA_VERSION=17

# program_installed() {
#   type "$1" >/dev/null 2>&1
# }

# is_pod_installed_and_updated() {
#   which pod > /dev/null 2>&1 && [[ "$(pod --version)" =~ ^([0-9]+\.){2}[0-9]+$ ]] && \
#   [[ "$(printf '%s\n' "$(pod --version)" "$REQUIRED_POD_VERSION" | sort -V | head -n1)" = "$REQUIRED_POD_VERSION" ]]
# }

# is_node_version_correct() {
#   node --version 2> /dev/null | grep -q "^v${REQUIRED_NODE_VERSION}\$"
# }

# if ! program_installed brew; then
#   echo 'Installing brew...'
#   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#   else
#     brew update
# fi

# if ! program_installed watchman; then
#   echo 'Installing watchman...'
#   brew install watchman
# fi

# if program_installed nvm; then
#   echo 'nvm can be a conflict with volta. Please consider removing it first'
#   exit 1
# fi

# if ! program_installed volta; then
#   echo 'Installing volta...'
#   curl https://get.volta.sh | bash
# fi

# # Install or pin Node.js to the correct version
# if ! is_node_version_correct; then
#   echo "Installing Node.js v$REQUIRED_NODE_VERSION"
#   volta install "node@$REQUIRED_NODE_VERSION"

#   echo "Pinning to Node.js v$REQUIRED_NODE_VERSION"
#   volta pin "node@$REQUIRED_NODE_VERSION"
# fi

# # Install pod
# if ! is_pod_installed_and_updated; then
#   echo 'Installing or updating cocoapods...'
#   sudo gem install cocoapods
# fi

# # Install JDK
# CURRENT_JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | sed -E 's/([0-9]+)\.([0-9]+).*/\1/')
# if ! program_installed java || [ "$CURRENT_JAVA_VERSION" -lt "$REQUIRED_JAVA_VERSION" ]; then
#   echo "Installing JDK ${REQUIRED_JAVA_VERSION}..."
#   brew tap homebrew/cask-versions
#   brew install --cask "zulu${REQUIRED_JAVA_VERSION}"
#   NEW_JAVA_HOME="export JAVA_HOME=\"/Library/Java/JavaVirtualMachines/zulu-${REQUIRED_JAVA_VERSION}.jdk/Contents/Home\""

#   # Check if JAVA_HOME is already set in .bash_profile
#   if grep -q 'export JAVA_HOME' ~/.bash_profile; then
#     # Replace the existing JAVA_HOME line
#     sed -i '' -E 's|^export[ \t]+JAVA_HOME=.*$|'"$NEW_JAVA_HOME"'|' ~/.bash_profile
#   else
#     # Append the new JAVA_HOME line
#     echo "$NEW_JAVA_HOME" >> ~/.bash_profile
#   fi
# fi

# echo 'Installing npm packages...'
# npm cache clean -f
# watchman watch-del-all
# rm -rf ios/Pods ios/Podfile.lock ios/build
# rm -rf ~/Library/Developer/Xcode/DerivedData/
# rm -rf android/app/build
# npm config set legacy-peer-deps true
# npm run upgrade
# npm run pod

# echo 'Generating locale and graphql types...'
# npm run generate-locale
# npm run generate-graphtypes

# npm run generate-license-report

# echo 'For Android setup, see https://reactnative.dev/docs/environment-setup'
# echo 'Run "npm run ios" or "npm run android" to start the app'
# echo 'Done!'
