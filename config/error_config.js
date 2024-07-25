module.exports = {
  LOGIN: {
    INVALIDE_USERNAME_LENGTH: {
      error_code: 10001,
      error_message: 'Invalide username length',
    },
    INVALIDE_PASSWORD_LENGTH: {
      error_code: 10002,
      error_message: 'Invalide password length',
    },
    USERNAME_NOT_EXIST: {
      error_code: 10003,
      error_message: "Username isn't exist in database",
    },
    PASSWORD_ERROR: {
      error_code: 10004,
      error_message: "Password doesn't matched with the username",
    },
    INVALIDE_OPERATION: {
      error_code: 10005,
      error_message: 'Username or password is required',
    },
    NOT_LOGIN_STATUS: {
      error_code: 10006,
      error_message: 'Is not logged',
    },
    LOGIN_STATUS: {
      error_code: 10007,
      error_message: 'Already logged in',
    },
    LOGOUT_STATUS: {
      error_code: 0,
      error_message: 'Logout success',
    },
    SUCESS: {
      error_code: 0,
      error_message: 'Login success',
    },
  },
  API: {
    RETURN_SUCCESS: {
      error_code: 0,
      error_message: 'Data is returned successfully',
    },
    RETURN_FAIL: {
      error_code: 20001,
      error_message: 'Data is returned failed',
    },
    CHANGE_COURSE_TAB_SUCCESS: {
      error_code: 0,
      error_message: 'course_tab is changed successfully',
    },
    CHANGE_COURSE_TAB_FAIL: {
      error_code: 20002,
      error_message: "it's fail to change course_tab",
    },
    CHANGE_STATUS_SUCCESS: {
      error_code: 0,
      error_message: 'status is changed successfully',
    },
    CHANGE_STATUS_FAIL: {
      error_code: 20003,
      error_message: "it's fail to change status",
    },
    FIELD_ERROR: {
      error_code: 20004,
      error_message: 'Field is wrong',
    },
  },
}
