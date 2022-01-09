import { PassportStatic } from "passport";
import {
  Strategy as GithubStrategy,
  Profile as GithubProfile,
} from "passport-github2";
import User from "../models/user.model";
import { OAuth2Strategy } from "passport-google-oauth";

export default (passport: PassportStatic) => {
  // --------- GITHUB AUTH
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3400/api/auth/github/callback"
            : "https://demo.portfolio.amirmuha.com/note-boxing/api/auth/github/callback",
      },
      (_, _2, profile: GithubProfile, done) => {
        console.log(profile);
      }
    )
  );
  // --------- GOOGLE AUTH
  const GoogleStrategy = OAuth2Strategy;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3400/api/auth/google/callback"
            : "https://demo.portfolio.amirmuha.com/note-boxing/api/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        console.log("token", token);
        console.log("token secret", tokenSecret);
        console.log("profile", profile);
        // User.findById({ googleId: profile.id }, function (err, user) {
        // return done(err, user);
        // });
      }
    )
  );
};
