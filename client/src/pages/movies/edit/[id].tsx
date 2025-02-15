import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Movie, InsertMovie } from "@shared/schema";
import MovieForm from "@/components/movie-form";

export default function EditMovie() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: [`/api/movies/${id}`],
  });

  const mutation = useMutation({
    mutationFn: async (movie: InsertMovie) => {
      await apiRequest("PATCH", `/api/movies/${id}`, movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Success",
        description: "Movie updated successfully",
      });
      setLocation("/movies");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update movie",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Movie</h1>
      <MovieForm
        defaultValues={movie}
        onSubmit={(data) => mutation.mutate(data)}
        isSubmitting={mutation.isPending}
      />
    </div>
  );
}
