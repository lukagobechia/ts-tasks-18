import mongoose from "mongoose";
const expeneSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("expenses", expeneSchema);
