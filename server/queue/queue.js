const Bull = require("bull");

let emailQueue;

let sendNewEmail;

if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  let redisURL;
  if (process.env.NODE_ENV === "DEV") {
    redisURL =
      "rediss://red-coda878l6cac73bg3npg:M6oOlCMxrE6CtgncaHpBDW3OM49cWoSw@oregon-redis.render.com:6379";
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    redisURL = "redis://red-coda878l6cac73bg3npg:6379";
  }

  emailQueue = new Bull("email", {
    url: redisURL,
  });

  sendNewEmail = async (emailQueue, email) => {
    return emailQueue
      .add({ ...email })
      .then((res) => {
        console.log("res", res);
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  };
}

module.exports = { emailQueue, sendNewEmail };
