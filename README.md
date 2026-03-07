# Paw Mantra – Pet Care App

A full-featured **React Native** pet care app (iOS & Android) with an **Express + MongoDB** backend. Built for pet parents to manage their pets, book walkers and vets, set reminders, and more.

## Features

- **Auth** – Sign up, sign in, JWT tokens, password hashing (bcrypt), persistent session (AsyncStorage), guest mode
- **Home** – My Pets (from API), Services (Grooming, Walker, Boarding, Veterinary), Shop, Reminders (from API), Add Reminder
- **Profile** – Edit Profile, My Pets, Add Pet, account menu, sign out
- **Pet Walkers** – List from API, search, view profiles, book appointments
- **Find a Vet** – List of veterinarians with ratings and fees
- **Track** – Location tracking placeholder (ready for live maps)
- **Community** – Pet community feed (UI ready)
- **Animations** – Splash and list stagger (Reanimated), button press feedback
- **Backend API** – Users (CRUD, login with JWT), Pets (by user), Reminders, Walkers (MongoDB + Zod + protected routes)

## Running the app

### Backend (for auth & data)

```bash
cd backend
cp .env.example .env.development  # set PASSWORD and optionally JWT_SECRET
npm install
npm start
# Server runs on http://localhost:3500
```

### Mobile app

```bash
npm install
npm start    # Metro in one terminal
npm run ios  # or npm run android (in another terminal)
```

**Note:** If the backend is not running, sign-in/sign-up will show a network error. You can use **Continue as guest** to try the app without the backend.

**MongoDB `ENOTFOUND` / DNS errors:** If you see `querySrv ENOTFOUND _mongodb._tcp.cluster0....`, your network can't resolve MongoDB Atlas. The server will still start; DB routes will fail until you either fix DNS/network or use **local MongoDB**: install MongoDB, then in `backend/.env.development` set `MONGODB_URI=mongodb://localhost:27017/petapp` (and remove or leave `PASSWORD` unused).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
