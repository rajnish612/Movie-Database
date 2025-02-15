import { Link, useLocation } from "wouter";
import { AppBar, Toolbar, Container, Typography, Button, Box } from '@mui/material';
import { Movie as MovieIcon, Add as AddIcon } from '@mui/icons-material';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box 
              component={Link} 
              href="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                color: 'inherit' 
              }}
            >
              <MovieIcon sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                MovieDB
              </Typography>
            </Box>

            {location === "/" && (
              <Button
                component={Link}
                href="/movies/create"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Add Movie
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          mt: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}