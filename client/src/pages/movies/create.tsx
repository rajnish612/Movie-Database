import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertMovie } from "@shared/schema";
import MovieForm from "@/components/movie-form";

export default function CreateMovie() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (movie: InsertMovie) => {
      await apiRequest("POST", "/api/movies", movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Success",
        description: "Movie created successfully",
      });
      setLocation("/movies");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create movie",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Movie</h1>
      <MovieForm onSubmit={(data) => mutation.mutate(data)} isSubmitting={mutation.isPending} />
    </div>
  );
}
