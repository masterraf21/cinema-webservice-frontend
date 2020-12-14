import React, { Component } from 'react'
import styles from './GetMovieAll.module.scss'
import { JsonToTable } from 'react-json-to-table'
import axios from 'axios'
const url = process.env.REACT_APP_API_URL
class GetMovieAll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      loaded: false,
      found: false,
      error: false
    }
    this.getData()
  }

  async getData () {
    try {
      const res = await axios.get(url + '/movies')
      if (res.status === 200) {
        var newMovies = res.data.movies.map(el => {
          return {
            id: el._id,
            title: el.title,
            director: el.director,
            rating: el.rating,
            summary: el.summary
          }
        })
        this.setState({
          movies: newMovies,
          found: true,
          loaded: true
        })
      }
    } catch (e) {
      if (e.response.status === 500) {
        this.setState({
          error: true,
          loaded: true
        })
      } else if (e.response.status === 404) {
        this.setState({
          loaded: true
        })
      }
    }
  }

  render () {
    return (
      <span>
        {this.state.loaded && this.state.found ? (
          <div className={styles.container}>
            <JsonToTable json={this.state.movies} />
          </div>
        ) : this.state.loaded && this.state.error ? (
          <div className={styles.container}>Error Gan</div>
        ) : this.state.loaded ? (
          <div className={styles.container}>Not Found Gan</div>
        ) : (
          <div className={styles.container}>Loading API gan</div>
        )}
      </span>
    )
  }
}

export default GetMovieAll
