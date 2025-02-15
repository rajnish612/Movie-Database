import { Movie, type InsertMovie, type MovieDocument } from "@shared/schema";

export interface IStorage {
  getMovies(): Promise<MovieDocument[]>;
  getMovie(id: string): Promise<MovieDocument | null>;
  createMovie(movie: InsertMovie): Promise<MovieDocument>;
  updateMovie(id: string, movie: InsertMovie): Promise<MovieDocument | null>;
  deleteMovie(id: string): Promise<boolean>;
  searchMovies(query: string): Promise<MovieDocument[]>;
}

export class MongoStorage implements IStorage {
  async getMovies(): Promise<MovieDocument[]> {
    return await Movie.find();
  }

  async getMovie(id: string): Promise<MovieDocument | null> {
    return await Movie.findById(id);
  }

  async createMovie(movie: InsertMovie): Promise<MovieDocument> {
    return await Movie.create(movie);
  }

  async updateMovie(id: string, movie: InsertMovie): Promise<MovieDocument | null> {
    return await Movie.findByIdAndUpdate(id, movie, { new: true });
  }

  async deleteMovie(id: string): Promise<boolean> {
    const result = await Movie.findByIdAndDelete(id);
    return !!result;
  }

  async searchMovies(query: string): Promise<MovieDocument[]> {
    return await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } }
      ]
    });
  }
}

export const storage = new MongoStorage();