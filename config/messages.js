module.exports = {
  success: {
    created: 'user was created',
    updated: 'user was updated'
  },
  error: {
    notFound: 'user not found',
    wrongPassword: 'password incorrect',
    empty: 'The field cannot be empty',
    nameCharsMissing: 'must be at least 3 chars long',
    passwordCharsMissing: 'must be at least 8 chars long',
    invalidEmail: 'that is not a valid email',
    notWoloxEmail: 'it needs to be a mail from wolox',
    errorGetting: 'error getting a weet',
    invalidToken: 'it needs to be a valid token',
    emptyToken: 'a token is required',
    notAdmin: 'you do not have admin permissions'
  }
};
