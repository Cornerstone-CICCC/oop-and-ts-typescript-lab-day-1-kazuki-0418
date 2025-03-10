// 🎟️ Create a Movie Ticket Booking System where users can book tickets and check seat availability.
// 1. Create an enum called MovieGenre with at least 5 movie genres.
// 2. Create a tuple type called Seat which holds (rowLetter: string, seatNumber: number).
// 3. Create a type alias called Movie which contains: movieId (number), title (string), genre (MovieGenre), availableSeats (Seat[]).
// 4. Create a function called addMovie which adds a movie to the movies array. The function needs to return a Movie object.
// 5. Create a function called bookSeat which removes a seat from availableSeats if available. The return needs to be a string.
// 6. Create a function called checkSeatAvailability which returns true if a seat is available and false otherwise.

enum MovieGenre {
  Action,
  Comedy,
  Drama,
  Horror,
  SciFi,
}

type Seat = [string, number];

type Movie = {
  movieId: number;
  title: string;
  genre: MovieGenre;
  availableSeats: Seat[];
};

const movies: Movie[] = [];

function addMovie(
  movieId: number,
  title: string,
  genre: MovieGenre,
  availableSeats: Seat[]
) {
  const movie: Movie = {
    movieId,
    title,
    genre,
    availableSeats,
  };
  movies.push(movie);
  return movie;
}

const findMovie = (movieId: number) =>
  movies.find((movie) => movie.movieId === movieId);

function bookSeat(movieId: number, rowLetter: string, seatNumber: number) {
  const movie = findMovie(movieId);
  if (!movie) return "Movie not found";

  const index = movie.availableSeats.findIndex(
    (seat) => seat[0] === rowLetter && seat[1] === seatNumber
  );

  if (index === -1) return "Seat not available";
  movie.availableSeats.splice(index, 1);
  return `Seat ${rowLetter}${seatNumber} booked successfully`;
}

function checkSeatAvailability(
  movieId: number,
  rowLetter: string,
  seatNumber: number
) {
  const movie = findMovie(movieId);
  if (!movie) return "Movie not found";
  return movie.availableSeats.some(
    (seat) => seat[0] === rowLetter && seat[1] === seatNumber
  );
}

// Test cases (Create more if needed)
console.log(
  addMovie(1, "Avengers", MovieGenre.Action, [
    ["A", 1],
    ["A", 2],
  ])
); // { movieId: 1, title: "Avengers", genre: MovieGenre.Action, availableSeats: [["A", 1], ["A", 2]] }
console.log(bookSeat(1, "A", 1)); // "Seat A1 booked successfully"
console.log(checkSeatAvailability(1, "A", 1)); // false
console.log(checkSeatAvailability(1, "A", 2)); // true
console.log(checkSeatAvailability(1, "A", 3)); // false
console.log(bookSeat(1, "A", 2)); // "Seat A2 booked successfully"
console.log(checkSeatAvailability(1, "A", 2)); // false
console.log(bookSeat(1, "A", 2)); // "Seat not available"
