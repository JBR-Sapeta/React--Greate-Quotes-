# Technologies 
- React 18.0.0
- Redux 4.2.0
- React Router 6.3.0
- SASS/SCSS
- RWD
- Node 16.13.2

# Important 
- Backend is deployed on Firebase realtime database. Backend has no validation and data transforming, for that reason some data need to be transformed on the frontend.
- Some forms have no validation, to allow users entry invalid data and create error messages.
- Redux is only used for managing Authentication state and could be replaced by React Context.
- You can use following account: email:test@test.com password: 12345678. You also can create your own account  using dummy data.

# How to start 
- Insert your Firebase realtime database URL into FIREBASE_URL variable - path /src/lib/api.js
- To add authentication pass URL with your API_KEY  into authenticateAccount function - path /src/lib/api.js. 
  More information:
  https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 - Now you are redy to run scripts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


