import SInfo from 'react-native-sensitive-info';

const TOKEN = 'token';
const SHARED_PERFS = 'MyAppSharedPerfs';
const KEYCHAIN_SERVICE = 'MyAppKeychain';
const keyChainOptions = {
  sharedPreferencesName: SHARED_PERFS,
  keychainService: KEYCHAIN_SERVICE,
  touchId: true, //add this key
  showModal: true, //add this key
  kSecAccessControl: 'kSecAccessControlBiometryAny',
};

export async function getItem(key) {
  const hasAnySensors = await SInfo.isSensorAvailable();

  // on Android you can check if has any fingersprints enrolled
  const hasAnyFingerprintsEnrolled = await SInfo.hasEnrolledFingerprints();

  console.log({hasAnySensors, hasAnyFingerprintsEnrolled});

  const value = await SInfo.getItem(key, {
    ...keyChainOptions,
    touchID: hasAnySensors && hasAnyFingerprintsEnrolled,
    showModal: hasAnyFingerprintsEnrolled && hasAnySensors, //required (Android) - Will prompt user's fingerprint on Android
    strings: {
      // optional (Android) - You can personalize your prompt
      description: 'For quick and secure access to your account',
      header: 'Opooorrr',
    },
    // required (iOS) -  A fallback string for iOS
    kSecUseOperationPrompt:
      'We need your permission to retrieve encrypted data',
  });
  return value ? value : null;
}
export async function setItem(key, value) {
  const hasAnySensors = await SInfo.isSensorAvailable();

  // on Android you can check if has any fingersprints enrolled
  const hasAnyFingerprintsEnrolled = await SInfo.hasEnrolledFingerprints();
  return SInfo.setItem(key, value, {
    ...keyChainOptions,
    touchID: hasAnySensors && hasAnyFingerprintsEnrolled,
    showModal: hasAnyFingerprintsEnrolled && hasAnySensors, //required (Android) - Will prompt user's fingerprint on Android
    strings: {
      // optional (Android) - You can personalize your prompt
      description: 'For quick and secure access to your account',
      header: 'Opooorrr',
    },
    // required (iOS) -  A fallback string for iOS
    kSecUseOperationPrompt:
      'We need your permission to retrieve encrypted data',
  });
}
export async function removeItem(key) {
  return SInfo.deleteItem(key, keyChainOptions);
}
export const getToken = () => getItem(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value) => setItem(TOKEN, value);
