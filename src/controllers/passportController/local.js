import passport from "passport";
import passportLocal from "passport-local";
import userModel from "../../models/userModel";
import { transErrors, tranSuccess } from "../../../lang/vi";

let localStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      let user = await userModel.findByEmail(email);
      if (!user) {
        return done(null, false, req.flash("errors", transErrors.login_failed));
      }
      if (!user.local.isActive) {
        return done(null, false, req.flash("errors", transErrors.account_not_active));
      }
      let checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        return done(null, false, req.flash("errors", transErrors.login_failed));
      }
      return done(null, user, req.flash("success", tranSuccess.loginSuccess(user.username)));
    } catch (error) {
      return done(null, false, req.flash("errors", transErrors.server_error));
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findUserById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err), null;
      });
  });
};

module.exports = initPassportLocal;