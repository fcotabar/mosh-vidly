import React from 'react';
import Joi from 'joi-browser';

import { saveMovie, getMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

import Form from '../common/Form';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
    searchQuery: '',
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .integer()
      .required()
      .label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();

    // const genres = getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const { history, match } = this.props;

    const movieId = match.params.id;
    if (movieId === 'new') return;

    try {
      //
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (err) {
      //
      if (err.response && err.response.status === 404)
        history.replace('/not-found');
    }
    // console.log(movie);
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    // backend
    console.log('submited');

    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Submit')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
