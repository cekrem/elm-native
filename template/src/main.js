import { Elm } from "./Main.elm";
import { SafeArea } from "capacitor-plugin-safe-area";

async function start() {
  let safeAreaTopInPx = 0;

  try {
    const { insets } = await SafeArea.getSafeAreaInsets();
    safeAreaTopInPx = insets.top;
  } catch (_) {
    // Safe area not available (e.g. browser dev), use default
  }

  Elm?.Main?.init({
    flags: { safeAreaTopInPx },
  });
}

start();
