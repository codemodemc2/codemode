const bcrypt = require("bcrypt");
const crypto = require("crypto");

const saltRounds = 10;

exports.generateHash = (plainPassword, rounds = saltRounds) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = bcrypt.hash(plainPassword, rounds);
      setTimeout(() => resolve(hash), crypto.randomInt(0, 100));
    } catch (error) {
      setTimeout(() => reject(error), crypto.randomInt(0, 100));
    }
  });
};

exports.checkUser = (password, hash) => {
  return new Promise((resolve, reject) => {
    try {
      const match = bcrypt.compare(password, hash);
      setTimeout(() => resolve(match), crypto.randomInt(0, 100));
    } catch (error) {
      console.log(error);
      setTimeout(() => reject(error), crypto.randomInt(0, 100));
    }
  });
};

exports.sterilizeGmail = (email) => {
  let newEmail = email.split("@");
  if (newEmail[1] !== "gmail.com") {
    return email;
  }
  let gmailUsername = newEmail[0].split("+");
  gmailUsername = gmailUsername[0].replace(/\./g, "");
  return gmailUsername + "@gmail.com";
};
