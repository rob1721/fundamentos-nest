export default {
  success(message: any, status?: number) {
    return {
      statusCode: status || 200,
      message,
      error: '',
    };
  },

  error(message: any, status?: number) {
    return {
      statusCode: status || message.status || 500,
      message: '',
      error: message,
    };
  },
};
