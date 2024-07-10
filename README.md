#Trove Tracker
###What is it?
Trove Tracker is an application designed to help users keep track of their collections, whether they are inventory items or a wish list of wanted items. With a user-friendly interface, it allows you to search, view, and manage your collections efficiently. Trove Tracker supports both dark and light themes and provides seamless navigation between different views.

###Developer
- [Stephen Thomson] (https://github.com/Stephen-Thomson)

###Features
- Search: Find entries by name, type, or both, and view results alphabetically.
- List: View all entries in the selected table in alphabetical order.
- Add: Add a single item to the list.
- File: Read a CSV file to add a batch of items to the list.
- Delete: Delete one or more entries from the list.
- Dark Mode: Toggle between light and dark themes for a better user experience.
- Radio Buttons: Switch between different tables (Inventory and Wanted) easily.

#Setup and Deploy

##Setup

###Prerequisites
- React Native: Ensure you have React Native installed.
- Node.js: Required for running the development server.
- SQLite: Used for local storage.

###Run for Testing

####Development Environment
1.	Clone the Repository
git clone https://github.com/Stephen-Thomson/TroveTracker.git
2.	Navigate to the Project Directory
cd TroveTracker
3.	Install Dependencies
npm install
4.	Run the Development Server
npx react-native start
5.	Run on Emulator/Device
npx react-native run-android

###Build
####Building the Application
1.	Navigate to the Project Directory
cd TroveTracker
2.	Build the Project
./gradlew assembleRelease

###Deploy
After building the project, you can deploy the Trove Tracker application to your desired platform or server.


