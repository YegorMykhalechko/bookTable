import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate: [
        {
          validator: (val) => {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              val
            );
          },
          message: "Invalid email format",
        },
      ],
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    refresh_token: String,
  },
  {
    virtuals: {
      full_name: {
        get() {
          return this.first_name + " " + this.last_name;
        },
      },
    },
  }
);

export const UserModel = mongoose.model("User", UserSchema);
