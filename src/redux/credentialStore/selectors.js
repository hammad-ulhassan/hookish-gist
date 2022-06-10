export const selectToken = (state) => state.logins.token.token;
export const selectUsername = (state) => state.logins.token.username;
export const selectIsLoggedIn = (state) => state.logins.loggedIn;
export const selectLoggedTime = (state) => state.logins.loginTime;
export const selectAuthUserData = (state)=>state.logins.authUserData;
export const selectAuthUserDataStatus = (state) => state.logins.status;
export const selectAuthUserGistsStatus = (state) => state.logins.authUserGistsStatus;
export const selectAuthUserGists = (state) => state.logins.authUserGists