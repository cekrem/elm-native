# elm-native

Scaffold hybrid mobile apps with Elm, Vite, and Capacitor. ([Blog post](https://cekrem.github.io/posts/elm-native))

```bash
npx elm-native my-app
cd my-app
npm run dev
```

This gives you a working Elm + Vite + Capacitor project with iOS and Android ready to go, including safe area inset handling so you don't have to fight the notch on day one.

## Why?

I wanted to write mobile apps in Elm. Getting Elm, Vite, and Capacitor to play nice together is not trivial, so I made a scaffolding tool. It's very much an MVP, but it works.

## What you get

```
my-app/
├── src/
│   ├── Main.elm          # Your Elm app (starts as a counter)
│   └── main.js           # Thin JS bridge to Capacitor
├── index.html            # Mobile-friendly HTML shell
├── elm.json
├── vite.config.js
├── capacitor.config.json
├── android/              # Open with Android Studio
├── ios/                  # Open with Xcode
└── assets/               # App icons and splash screens
```

The template includes a simple counter that handles safe area insets, so you can see the full Elm-to-native pattern in action before replacing it with your own code.

## How it fits together

`main.js` reads device info from Capacitor (like safe area insets) and passes it to Elm as flags. Elm handles all the UI. Vite compiles Elm via `vite-plugin-elm`. Capacitor wraps the built web app in a native shell.

## Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Vite dev server on port 3000                        |
| `npm run build`        | Production build to `dist/`                         |
| `npm run sync`         | Generate assets, build, and sync to native projects |
| `npm run open:android` | Open in Android Studio                              |
| `npm run open:ios`     | Open in Xcode                                       |
| `npm run run:android`  | Build and run on Android device/emulator            |
| `npm run run:ios`      | Build and run on iOS device/simulator               |

## Adding native capabilities

Install a Capacitor plugin and wire it up in `main.js`:

```bash
npm install @capacitor/camera
```

Use flags for initial data, ports for runtime communication back to Elm.

## Requirements

- Node.js
- Android Studio for Android (works on all platforms)
- Xcode for iOS (requires macOS)

## License

MIT
