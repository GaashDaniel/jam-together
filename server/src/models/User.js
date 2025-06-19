import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  instrumentToFamilyMap,
  INSTRUMENT_FAMILIES,
  getInstrumentFamily,
  isValidInstrument,
} from "../constants/instruments.js";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    instruments: {
      type: [
        {
          instrument: {
            type: String,
            required: true,
            trim: true,
            validate: {
              validator: function (value) {
                return isValidInstrument(value);
              },
              message: "Please select a valid instrument",
            },
          },
          family: {
            type: String,
            enum: INSTRUMENT_FAMILIES,
            required: false,
          },
          experienceInYears: {
            type: Number,
            required: true,
            min: 1,
            max: 99,
          },
        },
      ],
      validate: {
        validator: function (v) {
          if (this.isNew) {
            return Array.isArray(v) && v.length > 0;
          }
          return true;
        },
        message: "Please add at least one instrument upon registration.",
      },
    },
    birthDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Birth date cannot be in the future",
      },
    },
    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    profilePicture: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return (
            /^https?:\/\/.+/.test(value) ||
            /^\/uploads\/profile-pictures\/.+/.test(value)
          );
        },
        message: "Profile picture must be a valid URL or uploaded file path",
      },
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};
UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.passwordHash = await bcrypt.hash(this.password, 10);
    this.password = undefined;
  }
  if (this.isModified("instruments") || this.isNew) {
    this.instruments.forEach((inst) => {
      if (inst.instrument) {
        inst.family = getInstrumentFamily(inst.instrument);
      }
    });
  }
  next();
});
const User = mongoose.model("User", UserSchema);
export default User;