import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMovieSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/movies", async (req, res) => {
    const search = req.query.search as string | undefined;
    const movies = search 
      ? await storage.searchMovies(search)
      : await storage.getMovies();
    res.json(movies);
  });

  app.get("/api/movies/:id", async (req, res) => {
    const movie = await storage.getMovie(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  });

  app.post("/api/movies", async (req, res) => {
    const parseResult = insertMovieSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid movie data" });
      return;
    }
    const movie = await storage.createMovie(parseResult.data);
    res.status(201).json(movie);
  });

  app.patch("/api/movies/:id", async (req, res) => {
    const parseResult = insertMovieSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid movie data" });
      return;
    }
    const movie = await storage.updateMovie(req.params.id, parseResult.data);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  });

  app.delete("/api/movies/:id", async (req, res) => {
    const success = await storage.deleteMovie(req.params.id);
    if (!success) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(204).send();
  });

  return createServer(app);
}