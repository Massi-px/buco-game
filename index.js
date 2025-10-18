/**
 * Entrée native (iOS/Android) pour React Native.
 * - Utilisée par Metro et les apps natives via AppRegistry.
 * - Pour le web, l'entrée est src/main.tsx chargée par index.html via Vite.
 *
 * Vous pouvez laisser ce fichier tel quel pour les plateformes natives.
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
