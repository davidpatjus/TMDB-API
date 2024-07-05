API Documentation

This document provides details about interacting with the Movie Database (TMDb) API.

Endpoints

List Movies
GET /api/movies
Endpoint to list movies with pagination and filtering options.

Query Parameters:
page (int): Page number for pagination. Default is 1.
region (string): Region code to filter movies by geographic location.
language (string): Language code (ISO 639-1). Default is 'en-US'.
query (string): Search term to filter movies by title or description.
genre (string): Genre ID or name to filter movies by genre.
Examples:


List all movies:

GET /api/movies
Search movies by title:

GET /api/movies?query=avatar
Filter movies by genre ID:

GET /api/movies?genre=28
Filter movies by genre name:

GET /api/movies?genre=action
Get Movie Details

GET /api/movies/:id
Endpoint to get details of a specific movie.

Path Parameter:
id (string): The movie identifier in TMDb database.
Example:


GET /api/movies/12345
List TV Shows
GET /api/tv
Endpoint to list TV shows with pagination and filtering options.

Query Parameters:
page (int): Page number for pagination. Default is 1.
region (string): Region code to filter TV shows by geographic location.
language (string): Language code (ISO 639-1). Default is 'en-US'.
query (string): Search term to filter TV shows by title or description.
genre (string): Genre ID or name to filter TV shows by genre.
Examples:

List all TV shows:


GET /api/tv
Search TV shows by title:


GET /api/tv?query=friends
Filter TV shows by genre ID:


GET /api/tv?genre=18
Filter TV shows by genre name:


GET /api/tv?genre=comedy
Get TV Show Details


GET /api/tv/:id
Endpoint to get details of a specific TV show.

Path Parameter:
id (string): The TV show identifier in TMDb database.
Example:


GET /api/tv/67890
Search People


GET /api/people
Endpoint to search for people (actors, directors, etc.) by name.

Query Parameters:
language (string): Language code (ISO 639-1). Default is 'en-US'.
include_adult (boolean): Include adult content in results. Default is false.
page (int): Page number for pagination. Default is 1.
query (string): Search term to filter people by name.
Examples:

Search people by name:


GET /api/people?query=leonardo
Get Person Details


GET /api/people/:id
Endpoint to get details of a specific person.

Path Parameter:
id (string): The person identifier in TMDb database.
Example:


GET /api/people/54321
Get Trending Content


GET /api/trending/:type
Endpoint to get trending content for movies or TV shows.

Path Parameter:

type (string): Type of content ('movie' or 'tv').
Query Parameters:

time_window (string): Time window to get trending content ('day' or 'week'). Default is 'day'.
Examples:

Get trending movies of the day:


GET /api/trending/movie
Get trending TV shows of the week:


GET /api/trending/tv?time_window=week
Running the Server
To run the server, make sure you have Node.js installed. Then, follow these steps:

Install dependencies:

Copy code
npm install
Set environment variables in a .env file:

PORT=3000
TMDB_API_KEY=your_tmdb_api_key
Start the server:
npm run dev
Replace your_tmdb_api_key with your actual TMDb API key.
