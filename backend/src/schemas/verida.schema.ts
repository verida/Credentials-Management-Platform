import { Schema } from 'mongoose';

export const VeridaSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    schemaUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'insertedAt' } },
);
