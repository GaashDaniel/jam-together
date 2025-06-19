import mongoose from "mongoose";
const instrumentToFamilyMap = {
  vocals: "vocals",
  guitar: "strings",
  bass: "strings",
  violin: "strings",
  viola: "strings",
  cello: "strings",
  "double bass": "strings",
  banjo: "strings",
  mandolin: "strings",
  ukulele: "strings",
  harp: "strings",
  flute: "winds",
  clarinet: "winds",
  saxophone: "winds",
  trumpet: "winds",
  trombone: "winds",
  tuba: "winds",
  oboe: "winds",
  bassoon: "winds",
  harmonica: "winds",
  accordion: "winds",
  drums: "percussion",
  "drum kit": "percussion",
  congas: "percussion",
  bongos: "percussion",
  timbales: "percussion",
  djembe: "percussion",
  cajon: "percussion",
  xylophone: "percussion",
  marimba: "percussion",
  vibraphone: "percussion",
  tambourine: "percussion",
  triangle: "percussion",
  cymbals: "percussion",
  piano: "keyboard",
  keyboard: "keyboard",
  organ: "keyboard",
  harpsichord: "keyboard",
  synthesizer: "keyboard",
  keytar: "keyboard",
  "electronic drums": "electronic",
  sampler: "electronic",
  turntables: "electronic",
  "dj controller": "electronic",
  other: "other",
};
const JoinRequestSchema = new mongoose.Schema(
  {
    jamEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JamEvent",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    instrument: {
      instrument: {
        type: String,
        required: true,
        trim: true,
      },
      family: {
        type: String,
        enum: Object.values(instrumentToFamilyMap),
        required: false,
      },
      experienceInYears: {
        type: Number,
        min: 0, 
        max: 100,
      },
    },
    approvalStatus: {
      type: Boolean,
      default: null,
    },
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
JoinRequestSchema.pre("save", function (next) {
  if (this.isModified("instrument.instrument") || this.isNew) {
    if (this.instrument && this.instrument.instrument) {
      const instrumentKey = this.instrument.instrument.toLowerCase().trim();
      this.instrument.family = instrumentToFamilyMap[instrumentKey] || "other";
    }
  }
  next();
});
JoinRequestSchema.virtual("username", {
  ref: "User",
  localField: "requester",
  foreignField: "_id",
  justOne: true,
});
JoinRequestSchema.methods.approve = async function () {
  this.approvalStatus = true;
  return await this.save();
};
JoinRequestSchema.methods.reject = async function () {
  this.approvalStatus = false;
  return await this.save();
};
JoinRequestSchema.methods.isPending = function () {
  return this.approvalStatus === null;
};
JoinRequestSchema.methods.isApproved = function () {
  return this.approvalStatus === true;
};
JoinRequestSchema.methods.isRejected = function () {
  return this.approvalStatus === false;
};
JoinRequestSchema.statics.findPendingByEvent = function (jamEventId) {
  return this.find({
    jamEvent: jamEventId,
    approvalStatus: null,
  }).populate("requester", "username fullName profilePicture");
};
JoinRequestSchema.statics.findByEventAndRequester = function (
  jamEventId,
  requesterId
) {
  return this.findOne({
    jamEvent: jamEventId,
    requester: requesterId,
  });
};
JoinRequestSchema.index({ jamEvent: 1, requester: 1 }, { unique: true });
JoinRequestSchema.index({ approvalStatus: 1 });
JoinRequestSchema.index({ createdAt: -1 });
const JoinRequest = mongoose.model("JoinRequest", JoinRequestSchema);
export default JoinRequest;