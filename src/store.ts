import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchFilter } from './SearchFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Movie } from './Movie';

interface MovieListState {
    searchFilter: SearchFilter;
    selectedMovie: Movie | null;
}

const initialMovieListState: MovieListState = {
    searchFilter: {
        type: 'movie',
        sortBy: 'popularity'
    },
    selectedMovie: null
}

const movieListSlice = createSlice({
    name: 'movieList',
    initialState: initialMovieListState,
    reducers: {
        searchFilterChanged(state: MovieListState, action: PayloadAction<SearchFilter>) {
            state.searchFilter = action.payload;
        },
        selectedMovieChanged(state: MovieListState, action: PayloadAction<Movie | null>) {
            state.selectedMovie = action.payload;
        }
    }
});

export const { searchFilterChanged, selectedMovieChanged } = movieListSlice.actions;

export const store = configureStore({
    reducer: {
        movieList: movieListSlice.reducer
    }
});

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
