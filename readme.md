# Project Setup packages
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context

android/app/src/main/java/<your package name>/MainActivity.java

import android.os.Bundle;

write this function after main parent
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // SplashScreen.show(this);  // here
      super.onCreate(null);
      // super.onCreate(savedInstanceState);
  }

yarn add @react-navigation/native-stack
For more refer this -:) https://reactnavigation.org/docs/hello-react-navigation

Bottom tab navigator
yarn add @react-navigation/bottom-tabs
https://reactnavigation.org/docs/bottom-tab-navigator/

## swiper
yarn add react-native-onboarding-swiper
https://github.com/jfilter/react-native-onboarding-swiper#readme






### Authentication Works
yarn add @react-native-firebase/app
yarn add @react-native-firebase/auth
add google-services.json to android/app directory
https://rnfirebase.io/
add this line to  /android/build.gradle file:
        classpath 'com.google.gms:google-services:4.3.14'
        
        buildscript {
  dependencies {
    // ... other dependencies
    classpath 'com.google.gms:google-services:4.3.14'
    // Add me --- /\
  }
}

