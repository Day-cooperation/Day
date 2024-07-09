export const VALIDATE_INPUT_VALUE = {
  name: {
    message: {
      required: '이름을 입력해주세요.',
      length: '2자 이상 8자 이하의 이름을 입력해주세요',
    },
  },
  email: {
    regexp: /\S+@\S+\.\S/,
    message: {
      required: '이메일을 입력해주세요.',
      pattern: '올바른 이메일이 아닙니다.',
    },
  },
  password: {
    regexp: /^(?=.*\d)[a-zA-Z\d]{8,}$/,
    message: {
      required: '패스워드를 입력해주세요.',
      pattern: '알파벳과 숫자를 섞어 입력해주세요.',
      length: '비밀번호가 8자 이상이 되도록 해 주세요.',
    },
  },
  passwordConfirm: { message: { required: '확인 패스워드를 입력해주세요', notMatch: '비밀번호가 일치하지 않습니다.' } },
};
