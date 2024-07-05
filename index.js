import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Función para obtener el ID de género (category) por nombre.
 * @param {string} mediaType - Tipo de medio ('movie' o 'tv').
 * @param {string} genreName - Nombre del género a buscar.
 * @returns {Promise<number>} - Promesa que resuelve con el ID del género.
 */
async function getGenreId(mediaType, genreName) {
  const baseURL = `https://api.themoviedb.org/3/genre/${mediaType}/list`;
  const params = {
    api_key: TMDB_API_KEY,
  };

  const response = await axios.get(baseURL, { params });
  const genres = response.data.genres;

  const genre = genres.find(genre => genre.name.toLowerCase() === genreName.toLowerCase());

  if (!genre) {
    throw new Error(`No se encontró la categoría '${genreName}'`);
  }

  return genre.id;
}

/**
 * Endpoint para listar películas.
 * 
 * Query Parameters:
 * - page (int): Número de página para paginación. Por defecto, 1.
 * - region (string): Código de región para filtrar películas por ubicación geográfica.
 * - language (string): Código de idioma (ISO 639-1). Por defecto, 'en-US'.
 * - query (string): Término de búsqueda para filtrar películas por título o descripción.
 * - genre (string): Identificador de género para filtrar películas por género. Se puede proporcionar el ID o el nombre del género.
 * 
 * Si se proporciona 'query', se realiza una búsqueda usando 'search/movie'. De lo contrario, se usa 'discover/movie' para listar películas.
 */
app.get('/api/movies', async (req, res) => {
  try {
    const { page = 1, region, language = 'en-US', query, genre } = req.query;

    let baseURL;
    let params;

    if (query) {
      baseURL = 'https://api.themoviedb.org/3/search/movie';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        query,
        with_genres: genre,
      };
    } else if (genre && isNaN(genre)) { // Check if genre is a string (category name)
      const genreId = await getGenreId('movie', genre); // Function to fetch genre ID from name
      baseURL = 'https://api.themoviedb.org/3/discover/movie';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        with_genres: genreId,
      };
    } else {
      baseURL = 'https://api.themoviedb.org/3/discover/movie';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        with_genres: genre,
      };
    }

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al obtener la lista de películas:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Función para obtener detalles de una película específica.
 * 
 * Path Parameter:
 * - :id (string): El identificador de la película en la base de datos de TMDb.
 */
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const baseURL = `https://api.themoviedb.org/3/movie/${movieId}`;

    const params = {
      api_key: TMDB_API_KEY,
    };

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Endpoint para listar series de televisión (TV shows).
 * 
 * Query Parameters:
 * - page (int): Número de página para paginación. Por defecto, 1.
 * - region (string): Código de región para filtrar TV shows por ubicación geográfica.
 * - language (string): Código de idioma (ISO 639-1). Por defecto, 'en-US'.
 * - query (string): Término de búsqueda para filtrar TV shows por título o descripción.
 * - genre (string): Identificador de género para filtrar TV shows por género. Se puede proporcionar el ID o el nombre del género.
 * 
 * Si se proporciona 'query', se realiza una búsqueda usando 'search/tv'. De lo contrario, se usa 'discover/tv' para listar series de televisión.
 */
app.get('/api/tv', async (req, res) => {
  try {
    const { page = 1, region, language = 'en-US', query, genre } = req.query;

    let baseURL;
    let params;

    if (query) {
      baseURL = 'https://api.themoviedb.org/3/search/tv';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        query,
        with_genres: genre,
      };
    } else if (genre && isNaN(genre)) { // Check if genre is a string (category name)
      const genreId = await getGenreId('tv', genre); // Function to fetch genre ID from name
      baseURL = 'https://api.themoviedb.org/3/discover/tv';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        with_genres: genreId,
      };
    } else {
      baseURL = 'https://api.themoviedb.org/3/discover/tv';
      params = {
        api_key: TMDB_API_KEY,
        page: parseInt(page, 10),
        region,
        language,
        with_genres: genre,
      };
    }

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al obtener la lista de TV shows:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Función para obtener detalles de un TV show específico.
 * 
 * Path Parameter:
 * - :id (string): El identificador del TV show en la base de datos de TMDb.
 */
app.get('/api/tv/:id', async (req, res) => {
  try {
    const tvId = req.params.id;
    const baseURL = `https://api.themoviedb.org/3/tv/${tvId}`;

    const params = {
      api_key: TMDB_API_KEY,
    };

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al obtener detalles del TV show:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Endpoint para buscar personas.
 * 
 * Query Parameters:
 * - language (string): Código de idioma (ISO 639-1). Por defecto, 'en-US'.
 * - include_adult (boolean): Incluir contenido para adultos en los resultados. Por defecto, false.
 * - page (int): Número de página para paginación. Por defecto, 1.
 * - query (string): Término de búsqueda para filtrar personas por nombre.
 */
app.get('/api/people', async (req, res) => {
  try {
    const { language = 'en-US', include_adult = false, page = 1, query } = req.query;
    const baseURL = 'https://api.themoviedb.org/3/search/person';

    const params = {
      api_key: TMDB_API_KEY,
      language,
      include_adult,
      page: parseInt(page, 10),
      query,
    };

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al buscar personas:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Endpoint para obtener detalles de una persona específica.
 * 
 * Path Parameter:
 * - :id (string): El identificador de la persona en la base de datos de TMDb.
 */
app.get('/api/people/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const baseURL = `https://api.themoviedb.org/3/person/${personId}`;

    const params = {
      api_key: TMDB_API_KEY,
    };

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al obtener detalles de la persona:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

/**
 * Endpoint para obtener contenido trending.
 * 
 * Path Parameter:
 * - :type (string): Tipo de contenido ('movie' o 'tv').
 * 
 * Query Parameters:
 * - time_window (string): Ventana de tiempo para obtener contenido trending ('day', 'week'). Por defecto, 'day'.
 */
app.get('/api/trending/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { time_window = 'day' } = req.query;

    const baseURL = `https://api.themoviedb.org/3/trending/${type}/${time_window}`;
    const params = {
      api_key: TMDB_API_KEY,
    };

    const response = await axios.get(baseURL, { params });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error al obtener contenido trending para ${type}:`, error.message);
    res.status(error.response?.status || 500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
