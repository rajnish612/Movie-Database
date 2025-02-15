import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { MovieDocument } from "@shared/schema";
import MovieGrid from "@/components/movie-grid";
import SearchFilter from "@/components/search-filter";

export default function MovieList() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const { data: movies = [], isLoading } = useQuery<MovieDocument[]>({
    queryKey: ["/api/movies", search],
    queryFn: () => fetch(`/api/movies${search ? `?search=${search}` : ""}`).then(r => r.json())
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/movies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Success",
        description: "Movie deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete movie",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[400px] bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <SearchFilter search={search} onSearchChange={setSearch} />
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No movies found. Try a different search or add a new movie.
          </p>
        </div>
      ) : (
        <MovieGrid
          movies={movies}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}