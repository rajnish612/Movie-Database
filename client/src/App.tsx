import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import MovieList from "@/pages/movies";
import MovieDetails from "@/pages/movies/[id]";
import CreateMovie from "@/pages/movies/create";
import EditMovie from "@/pages/movies/edit/[id]";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={MovieList} />
        <Route path="/movies" component={MovieList} />
        <Route path="/movies/create" component={CreateMovie} />
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/movies/edit/:id" component={EditMovie} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;