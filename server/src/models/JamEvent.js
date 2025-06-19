import mongoose from "mongoose";
const JamEventSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      maxlength: 2000,
    },
    genres: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    location: {
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
      address: {
        type: String,
        trim: true,
        maxlength: 200,
      },
    },
    scheduledTo: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          if (typeof this.isModified === "function") {
            return this.isNew || this.isModified("scheduledTo")
              ? value > new Date()
              : true;
          }
          return value > new Date();
        },
        message: "Event date must be in the future",
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    instruments: [
      {
        instrument: {
          type: String,
          required: true,
          trim: true,
        },
        playedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        requestId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "JoinRequest",
          default: null,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "editedAt",
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
      virtuals: true,
    },
  }
);
JamEventSchema.methods.toggleLike = async function (userId) {
  const index = this.likes.indexOf(userId);
  if (index > -1) {
    this.likes.splice(index, 1);
  } else {
    this.likes.push(userId);
  }
  return await this.save();
};
JamEventSchema.methods.assignInstrument = async function (
  instrument,
  userId,
  requestId
) {
  const instrumentIndex = this.instruments.findIndex(
    (inst) => inst.instrument.toLowerCase() === instrument.toLowerCase()
  );
  if (instrumentIndex > -1) {
    this.instruments[instrumentIndex].playedBy = userId;
    this.instruments[instrumentIndex].requestId = requestId;
    return await this.save();
  }
  throw new Error("Instrument not found in event");
};
JamEventSchema.methods.removeAssignment = async function (instrument) {
  const instrumentIndex = this.instruments.findIndex(
    (inst) => inst.instrument.toLowerCase() === instrument.toLowerCase()
  );
  if (instrumentIndex > -1) {
    this.instruments[instrumentIndex].playedBy = null;
    this.instruments[instrumentIndex].requestId = null;
    return await this.save();
  }
  throw new Error("Instrument not found in event");
};
JamEventSchema.index({ scheduledTo: 1 });
JamEventSchema.index({ createdBy: 1 });
JamEventSchema.index({ "location.city": 1 });
JamEventSchema.index({ genres: 1 });
const JamEvent = mongoose.model("JamEvent", JamEventSchema);
export default JamEvent;