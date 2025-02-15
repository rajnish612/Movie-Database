import { Grid } from '@mui/material';
import type { MovieDocument } from "@shared/schema";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: MovieDocument[];
  onDelete: (id: string) => void;
}

export default function MovieGrid({ movies, onDelete }: MovieGridProps) {
  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
          <MovieCard movie={movie} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}