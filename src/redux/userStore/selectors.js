export const selectUserData = (state) => state.users.userData;
export const selectUserDataStatus = (state) => state.users.status;
export const selectUserDataError = (state) => state.users.error;

export const selectUserGistsStatus = (state) => state.users.userGistsStatus;
export const selectUserGists = (state) => state.users.userGists;

export const selectMyGistsStatus = (state) => state.users.myGistsStatus;
export const selectMyGists = (state) => state.users.myGists;