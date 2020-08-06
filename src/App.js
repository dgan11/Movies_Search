import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  // Initializer 
  constructor(props) {
    super(props)
    this.state = {}
    console.log("This is my initializer")

  // Hard Coded Example to help Test UI
  //   const movies = [
  //     {id: 0, poster_src: "https://image.tmdb.org/t/p/w370_and_h556_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg", title: "Avengers: Infinity War", overview: "Long description of the movie"},
  //     {id: 1, poster_src: "https://image.tmdb.org/t/p/w370_and_h556_bestv2/cezWGskPY5x7GaglTTRN4Fugfb8.jpg", title: "The Avengers", overview: "Second Long description of the movie"}
  //   ]

  //   var movieRows = []
  //   movies.forEach((movie) => {
  //     console.log(movie.title)
  //     const movieRow = <MovieRow movie={movie} />
  //     movieRows.push(movieRow)
  //   })
  //   this.state = {rows: movieRows}

  this.performSearch("a")
  }

  performSearch(searchTerm) {
    console.log("perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm 
    /* 
     * $ represents JQuersy and .ajax is a jQuery Method that 
     * allows you to asynchronously fetch data from the internet
     */
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        // Fetched data Successfully.
        console.log("fetched data successfully")
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows:movieRows})
      },
      error: (xhr, status, err) => {
        // Failed to fetch data
        console.error("failed to fetch data")
      }
    })
  }

  // Track changes to the input of the search bar
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    // bind two objects together and allow you to search that bounded object
    boundObject.performSearch(searchTerm)
  }

  render() {
    //Create the header with the logo followed by the search bar at input style
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.svg"></img>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize:24,
          display:'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft:16
        }} onChange = {this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

        {this.state.rows}

      </div>
    );
  }
}
export default App;

// To Start The Program
// >> npm run 