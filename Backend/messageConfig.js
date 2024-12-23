const ErrorMessage = {
  sessionError: {
    English: "Session has expired! Please login again",
    Hindi: "सत्र समाप्त हो चुका है! कृपया फिर भाग लें",
    ErrorCode: 401,
  },
  AuthError: {
    usernameError: {
      English: "Invalid Username!",
      Hindi: "����य����कर्तानाम ������्यक ����!",
      ErrorCode: 400,
    },
    passwordError: {
      English: "Invalid Password!",
      Hindi: "��ास��र्�� ������्यक ����!",
      ErrorCode: 400,
    },
  },
  ServerError: {
    English: "Internal server error!",
    Hindi: "अंतर्गत सर्व्हर त्रुटी!",
    ErrorCode: 403,
  },
  TodoError: {
    emptyFieldsError: {
      English: "Fields can't be empty!",
      Hindi: "स��ी ����ील्�� ������्यक ������!",
      ErrorCode: 400,
    },
    emptyIdError: {
      English: "Should pass Todo Id Parameter!",
      Hindi: "Id ��ील्�� ������्यक ����!",
      ErrorCode: 400,
    },
  },
};

module.exports = Object.freeze({
  ErrorMessage: ErrorMessage,
});
