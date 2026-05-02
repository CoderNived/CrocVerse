import mongoose from "mongoose";

const ObservationSchema = new mongoose.Schema(
  {
    // 🔹 Reference to Species (FK)
    species: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Species",
      required: true,
      index: true
    },

    // 🔹 Time dimensions (for trend analysis)
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: 2100
    },
    month: {
      type: Number,
      min: 1,
      max: 12
    },

    // 🔹 Observation data
    count: {
      type: Number,
      required: true,
      min: 0
    },

    region: {
      type: String,
      trim: true
    },

    observationType: {
      type: String,
      enum: ["Sighting", "Camera Trap", "Survey", "Nest Count"]
    },

    source: {
      type: String,
      trim: true
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);


// 🔑 Compound Index (CRITICAL for trend queries)
ObservationSchema.index({ species: 1, year: 1 });

// Optional but useful if you query monthly trends often
ObservationSchema.index({ species: 1, year: 1, month: 1 });


export default mongoose.model("Observation", ObservationSchema);