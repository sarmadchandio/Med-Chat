# MedChatBackup

To run our project git clone this link. <br />
npm install the dependencies

Then u need to make the following changes.\:
## Optional
1. Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.
(Saw setTimeout with duration 120000ms) <br />
Fix: 
Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.
Look for the variable MAX_TIMER_DURATION_MS
Change its value to 10000 * 1000
Save the changes (with auto format turned off) and re-build your app.

## Recommended
1. List-deprecated-view Error: <br />
Fix: <br />
Go to node_modules/../MessageContainer.js and change <import { ListView } from 'react-native'>
to <import ListView from 'deprecated-react-native-listview'>

2. Error while updating property 'stroke'..... <br />
Fix: <br />
Goto node_modules/react-native-progress/ and
comment out everything except: export { default as Circle } from './Circle';

After these changes you are good to go
