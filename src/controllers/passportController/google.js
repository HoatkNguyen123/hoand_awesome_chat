import passport from "passport";
import passportGoogle from "passport-google-oauth";
import userModel from "../../models/userModel";
import { transErrors, tranSuccess } from "../../../lang/vi";

let googleStrategy = passportGoogle.OAuth2Strategy;

let ggAppId = "419770143662-oc0uig6ld17dc97hq9altguugpo2lt84.apps.googleusercontent.com";
let ggAppSecret = "i5WTE31L5Zb-fGYplegc_wqM";
let ggCallBackUrl = "https://localhost:8017/auth/google/callback";

let initPassportGoogle = () => {
  passport.use(new googleStrategy({
    clientID: ggAppId,
    clientSecret: ggAppSecret,
    callbackURL: ggCallBackUrl,
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {

    try {
      let user = await userModel.findByGoogleUid(profile.id);
      if (user) {
        return done(null, user, req.flash("success", tranSuccess.loginSuccess(user.username)));
      }
      console.log(profile);
      let newUserItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: { isActive: true }, 
        google: {
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

module.exports = initPassportGoogle;