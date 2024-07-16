const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    userProfilePicture: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], // makes sure that we do not assign any other value aside from USER or ADMIN.
      default: "USER",
    },
  },
  { timestamps: true }
);

// basically things that are to be done before making a datgabase entry
userSchema.pre("save", function (next) {
  const user = this; //refer to the current user
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashedPassword;

    next();
});

const User = model("user", userSchema);

module.exports = { User };
