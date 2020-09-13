import passport from "passport";
import passportFacebook from "passport-facebook";
import userModel from "../../models/userModel";
import { transErrors, tranSuccess } from "../../../lang/vi";

let facebookStrategy = passportFacebook.Strategy;

let fbAppId = "1570803726414021";
let fbAppSecret = "940e3dc62968e9556146aaf3c66cd0b6";
let fbCallBackUrl = "https://localhost:8017/auth/facebook/callback";

let initPassportFacebook = () => {
  passport.use(new facebookStrategy({
    clientID: fbAppId,
    clientSecret: fbAppSecret,
    callbackURL: fbCallBackUrl,
    passReqToCallback: true,
    profileFields: ['email', 'gender', 'displayName']
  }, async (req, accessToken, refreshToken, profile, done) => {

    try {
      let user = await userModel.findByFacebookUid(profile.id);
      if (user) {
        return done(null, user, req.flash("success", tranSuccess.loginSuccess(user.username)));
      }

      let newUserItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: { isActive: true }, 
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        }
      };
      let newUser = await userModel.createNew(newUserItem);
      return done(null, newUser, req.flash("success", tranSuccess.loginSuccess(newUser.username)));

    } catch (error) {
      return done(null, false, req.flash("errors", transErrors.server_error));
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findUserByIdForSessionToUse(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err), null;
      });
  });
};

module.exports = initPassportFacebook;