import bcrypt from 'bcryptjs';

function encrypt(data: string) {
  return bcrypt.hash(data, 5);
}

function decryptAndCompare(data: string, encrypted: string) {
  return bcrypt.compare(data, encrypted);
}

export default {
  encrypt,
  decryptAndCompare,
};
