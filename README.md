

# [Check the app live](https://fathomless-temple-91293.herokuapp.com).

Install & Run:

- Checkout the project;
- `yarn` or `npm install` to install dependencies;
- `yarn start` or `npm run start` to start the App.
- `yarn test:coverage` to run tests with coverage.

Features:

- Authentication;
- Indicator Messages listing with basic filters;
- Indicator Message page.

Caveats:

- Unfortunately, during the development there was no way to set a correct CORS header on the requested resources from the staging URL. Use a browser that can go around this limitation, e.g. Safari or Firefox.
- During the last day of development, the OAuth endpoint stopped working, on staging. I assumed that this is a rate-limit or even a deploy on the endpoint that modified the response. Please see the request response below:

```
HTTP/1.1 500 Internal Server Error
Via: 1.1 vegur
Connection: keep-alive
Content-Length: 576
Content-Type: text/html
Date: Thu, 28 May 2020 22:56:48 GMT
X-Request-Id: 185b6f6e-1c9e-4ba1-9d19-ec1fdefd0909
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Runtime: 0.176340
Server: Cowboy

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>riskmethods</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet" type="text/css" />
    <link href="/static.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <div class="center centered">
      <p><img alt="Logo_gray" src="/logo_gray.png" /></p>
      <p>Something went wrong and we are already on it!</p>
      <!-- This comment is purely to ensure, that this file is at least 512 bytes in size. -->
    </div>
  </body>
</html>
```

Built with:
- **Typescript**
- **React**
- **Redux**
  
Libraries used:
- **React-Bootstrap**: easy layout structure. 
- **styled-components**: component customization.
- **Redux**: state container.
- **Jest**: test runner.
- **Testing Library**: testing utilities.  

--- 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
