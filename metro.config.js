const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './src/styles/global.css' })






// const { getDefaultConfig } = require("expo/metro-config"); // Use Expo's default Metro configuration
// const { withNativeWind } = require("nativewind/metro"); // Enable NativeWind for styling

// // Get the default Expo Metro configuration
// const config = getDefaultConfig(__dirname);

// // Explicitly add `.js` and other file extensions to ensure Metro can resolve them
// config.resolver.sourceExts = ["js", "jsx", "ts", "tsx", "json"];


// // Final configuration with NativeWind integration and explicit file resolution
// module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
