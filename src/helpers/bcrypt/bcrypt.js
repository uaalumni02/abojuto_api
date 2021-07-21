import bcrypt from "bcrypt";

const hashPassword = async (password, rounds) => {
  return new Promise((resolve, reject) => {
    return bcrypt.hash(password, rounds, (err, hash) => {
      if (err) return reject({ error: err });
      return resolve(hash);
    });
  });
};
const comparePassword = async (password, hash) => {
  return new Promise((resolve, error) => {
    return bcrypt.compare(password, hash, (err, success) => {
      if (err) return error({ error: err });
      return resolve(success);
    });
  });
};

export default {
  hashPassword,
  comparePassword,
};
