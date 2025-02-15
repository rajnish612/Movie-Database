import { Movie, type InsertMovie } from "@shared/schema";

const initialMovies: InsertMovie[] = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    rating: "9.3",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genre: "Crime, Drama",
    director: "Francis Ford Coppola",
    rating: "9.2",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    rating: "9.0",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
  }
];

export async function seedDatabase() {
  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      console.log('Seeding initial movie data...');
      await Movie.insertMany(initialMovies);
      console.log('Database seeded successfully!');
    } else {
      console.log('Database already has movies, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
