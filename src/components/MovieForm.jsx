import React from 'react';
import Joi from 'joi-browser';

import { saveMovie, getMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

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

  componentDidMount() {
    const { history, match } = this.props;

    const genres = getGenres();
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    // console.log(movie);
    if (!movie) return history.replace('/not-found');
    this.setState({ data: this.mapToViewModel(movie) });
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

  doSubmit = () => {
    // backend
    console.log('submited');

    saveMovie(this.state.data);
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
