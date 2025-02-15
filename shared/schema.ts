import mongoose from 'mongoose';
import { z } from 'zod';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  rating: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

export const Movie = mongoose.model('Movie', movieSchema);

// Zod schema for validation
export const insertMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  releaseYear: z.number().min(1888).max(new Date().getFullYear() + 5),
  genre: z.string().min(1, "Genre is required"),
  director: z.string().min(1, "Director is required"),
  rating: z.string().min(1, "Rating is required"),
  imageUrl: z.string().url("Image URL must be a valid URL")
});

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type MovieDocument = mongoose.Document & InsertMovie;