const axios = require('axios');

const withAuth = (req, res, next) => {
  // Checking for session if logged in, else go to login.
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next()
  }
};

// async function withRecaptcha(req, res, next) {
const withRecaptcha = async (req, res, next) => {
  const { token } = req.body;

  try {
    const reCapUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${token}`;

    let verifyResult = await axios.post(reCapUrl);
    if (verifyResult.data["success"] === true) {
      console.log("recaptcha success")
      next()
    } else {
      console.error("captcha validation failed");
      console.error(`reCaptcha Error Response: ${verifyResult.data['error-codes'].toString()}`);
      res.status(400).json({error: `Captcha Validation Failed`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: `Sign up failed.`});
  }
}

module.exports = {withAuth, withRecaptcha};