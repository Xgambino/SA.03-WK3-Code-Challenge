// json - a format that is easy for humans to read and for the computer to generate

// #       it can be used as an intermediate representation

// api(application programming interface)- helps  in communication between two software applications/servers

// POSTMAN - a popular platform for api development

// allows one to make http requests namely  GET,POST,PUT/PATCH,DELETE etc

// fetching  data from server using javascript- FETCH API

//use the getElementById method to get access to the div with a id name films where the list of movie is to go on your website

let movieList = document.getElementById("films");

//Create a variable containing an empty array where the fetched data from  the json is going to be stored

let movieData = [];//declares an empty array  called 'myMovieData' to store  all movies information

//Create a function with a function name and the purpose of the function is to retrive data from json and store the data in your arrat movieData

function fetchData() {
  // then method returns another promise which contains the response of our request.It takes a callback function as parameter.
  //fetch returns a promise so we need to use .then method which gets executed when the promise is resolved
  // the then method is executed when the condition is met.

  fetch("db.json")
    .then((response) => response.json())
    // then method returns another promise which contains the response of our request.It takes a callback function as parameter.
    // the then method is executed when the condition is met.

    .then((data) => {
      //assigns the value of 'data' to 'myMovieData' array after converting the response to a JSON
      movieData = data.films;
      displayData(); // call the 'displayMyMovieList' function to show the movies available on the screen
    });
}
function displayData() {
  // call the 'displayData' function to show the movies available on the screen
  movieData.forEach((movie) => {
    //For each movie in the 'MovieData' array  , create a list item element.
    let li = MovieDataList(movie); //this appends the 'myMovieList'  element to the webpage
    movieList.appendChild(li);
  });
}

function MovieDataList(movie) {
  //creates a single li element and returns it
  const li = document.createElement("li"); //sets the text content of the list to the moovie title
  li.textContent = movie.title;
  li.dataset.movieId = movie.id; // gives each  item in the list a unique id
  li.classList.add("film", "item"); //add css to style the list
  li.addEventListener("click", () => updateDetails(movie.id)); // adds click event listener for every item in the list
  return li; //return the created list item
}

//defines a function that searches for a movie object with a specific id in an array of movie objects, and returns the matching object if found.
function updateDetails(movieId) {
  let movie = movieData.find((i) => i.id === movieId);
  if (!movie) return;

  //calculates the number of the tickets remaining when the user views the movie

  let availableTickets = movie.capacity - movie.tickets_sold;

  let buyButton = document.getElementById("buy-ticket"); //calculates the number of available tickets for a movie and selects a button element that presumably allows users to buy tickets.

  //When the user click on the movie, the buy button is displayed and the text is changed to buy ticket but if the tickets are sold out, the text is changed to sold out

  buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";

  buyButton.classList.toggle("disabled", availableTickets === 0);
  buyButton.onclick = () => {
    if (availableTickets > 0) {
      purchaseTicket(movie);
    }
  };

  displayMovieDetails(movie);
}

//This function will be used to purchase the ticket and update the ticket count and gives the details of the movie

function purchaseTicket(movie) {
  movie.tickets_sold++;
  updateTicketCount(movie.id);
  updateDetails(movie.id);
}

//update the ticket count and display the movie details

function updateTicketCount(movieId) {
  const movie = movieData.find((m) => m.id === movieId);
  const availableTickets = movie.capacity - movie.tickets_sold;
  document.getElementById("ticket-num").textContent = availableTickets;
}

function displayMovieDetails(movie) { //defines a new function called displayMovieDetails. The function takes one parameter, movie, which is an object containing details about a movie.
  document.getElementById("title").textContent = movie.title; //finds the HTML element with the id of "title" and sets its textContent to the title property of the movie object.
  document.getElementById("runtime").textContent = `${movie.runtime} minutes;`; //does a similar thing, but it sets the textContent of the HTML element with the id of "runtime". It also uses a template literal to include the runtime property of the movie object in the text, followed by the word "minutes;"
  document.getElementById("film-info").textContent = movie.description; //sets the textContent of the HTML element with the id of "film-info" to the description property of the movie object.
  document.getElementById("showtime").textContent = movie.showtime; //sets the textContent of the HTML element with the id of "showtime" to the showtime property of the movie object.
  document.getElementById("poster").src = movie.poster; //The src attribute is set to the poster property of the movie object, which should be a URL pointing to the movie's poster image
  document.getElementById("poster").alt = `Poster for ${movie.title};`; //The alt attribute is set to a string that describes the image, which is the word "Poster" followed by the title of the movie.
  updateTicketCount(movie.id); //updates a count of tickets sold or available for the movie
}

console.log(fetchData());