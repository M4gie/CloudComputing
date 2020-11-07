import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const {
  SNOWPACK_PUBLIC_COGNITO_USER_POOL_ID,
  SNOWPACK_PUBLIC_COGNITO_CLIENT_ID,
} = import.meta.env;

function storeUser(credentials: { username: string; token: string }) {
  localStorage.setItem('credentials', JSON.stringify(credentials));
}

function getUser(): { username: string; token: string } | null {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    return JSON.parse(credentials);
  }
  return null;
}

type Register = {
  email: string;
  password: string;
  username: string;
};

var poolData = {
  UserPoolId: SNOWPACK_PUBLIC_COGNITO_USER_POOL_ID as string, // Your user pool id here
  ClientId: SNOWPACK_PUBLIC_COGNITO_CLIENT_ID as string, // Your client id here
};

function register({ email, password, username }: Register) {
  var userPool = new CognitoUserPool(poolData);

  var attributeList: any[] = [];

  var dataEmail = {
    Name: 'email',
    Value: email,
  };

  var attributeEmail = new CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, [], function (
      err,
      result,
    ) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

type Login = {
  password: string;
  username: string;
};

function login({ password, username }: Login) {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);
  var userPool = new CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        resolve(accessToken);
      },

      onFailure: function (err) {
        reject(err);
      },
    });
  });
}

export { storeUser, getUser, register, login };
