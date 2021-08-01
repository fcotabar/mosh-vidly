import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { toast } from 'react-toastify';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';

// import Like from '../common/Like';
import Pagination from '../common/Pagination';
import { Genres } from '../common/Genres';
import MoviesTable from './MoviesTable';
import { SearchBox } from '../common/SearchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: '',
    searchQuery: '',
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    // deleteMovie();
    // console.log(movie);
    const originalMovies = this.state.movies;

    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (err) {
      toast.error('This movie has already been deleted.');
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    // console.log('handleLike clicked');
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log('Page changed', page);
    this.setState({ currentPage: page });
  };

  handelSelectGenre = (genre) => {
    // console.log('Select Genre clicked', genre);
    this.setState({
      selectedGenre: genre,
      searchQuery: '',
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: query ? null : '',
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    // console.log(path);
    // const sortColumn = { ...this.state.sortColumn };

    // if (sortColumn.path === path) {
    //   sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    //   // console.log(sortColumn.order);
    // } else {
    //   sortColumn.path = path;
    //   sortColumn.order = 'asc';
    // }

    this.setState({ sortColumn });
    // console.log(this.state);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    // console.log(count);
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>No movies in the databaes to show</p>;

    const { totalCount, data: movies } = this.getPageData();
    const {user } = this.props;
    // console.log(this.props);

    return (
      <div className="movies__container">
        <div className="movies__genres">
          <Genres
            moviesGenres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={this.handelSelectGenre}
          />
        </div>
        <div className="movies__list">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-2">
              New movie
            </Link>
          )}
          <p>Showing {totalCount} movies</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            user={user}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
