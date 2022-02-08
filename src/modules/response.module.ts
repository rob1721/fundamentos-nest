export default {
  success(message: any, status?: number) {
    return {
      error: '',
      message,
      status: status || 200,
    };
  },

  error(message: any, status?: number) {
    return {
      error: message,
      message: '',
      status: status || 500,
    };
  },
};
