import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Movie } from "@shared/schema";

export default function MovieDetails() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: [`/api/movies/${id}`],
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-[400px] bg-muted rounded-lg" />
        <div className="h-8 w-1/3 bg-muted rounded" />
        <div className="h-4 w-1/4 bg-muted rounded" />
        <div className="h-20 bg-muted rounded" />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => setLocation("/movies")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Movies
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="rounded-lg aspect-video object-cover w-full"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {movie.director} • {movie.releaseYear}
          </p>
          
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold mb-1">Genre</h2>
              <p>{movie.genre}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-1">Rating</h2>
              <p>{movie.rating}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-1">Description</h2>
              <p className="text-muted-foreground">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
