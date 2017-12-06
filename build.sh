curl -k "http://localhost:8081/index.android.bundle?platform=android&dev=false&minify=true" > android/app/src/main/assets/index.android.bundle
cd android/
./gradlew assembleRelease

open app/build/outputs/apk