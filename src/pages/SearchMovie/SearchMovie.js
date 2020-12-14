import React, { useState } from 'react'
import styles from './SearchMovie.module.scss'
import { JsonToTable } from 'react-json-to-table'
import { Button } from '../../components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
const MySwal = withReactContent(Swal)
const url = process.env.REACT_APP_API_URL

const SearchMovie = () => {
  const [loaded, setLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [movies, setMovies] = useState([])

  const bothEmpty = () => {
    return title === '' && director === ''
  }
  const onSubmit = async () => {
    if (bothEmpty()) {
      MySwal.fire({
        title: 'Minimal salah satu gan',
        icon: 'warning',
        text: 'Cek lagi query nya',
        timer: 2000
      })
    } else {
      try {
        const res = await axios.get(url + '/movies/query/p', {
          params: {
            director: director,
            title: title
          }
        })
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
          setMovies(newMovies)
          setLoaded(true)
          MySwal.fire({
            title: 'Movie found',
            icon: 'success',
            timer: 2000
          })
        }
      } catch (e) {
        if (e.response.status === 404) {
          setMovies([])
          MySwal.fire({
            title: 'No Movie Found',
            icon: 'error',
            text: 'Check the id again',
            timer: 2000
          })
        } else {
          MySwal.fire({
            title: 'Something bad happen',
            icon: 'error',
            timer: 2000
          })
        }
      }
    }
  }
  return (
    <span>
      {loaded ? (
        <div className={styles.container}>
          <div className={styles.title}>Movies</div>
          <div
            style={{
              display: 'flex',
              height: '200px',
              width: '80%',
              marginTop: '30px'
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <JsonToTable json={movies} />
            </div>
          </div>
          <Button
            className={styles.submit}
            bgColor='#660080'
            textColor='white'
            onClick={() => window.location.reload()}
            title='Reload'
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.title}>Search Movie</div>
          <div className={styles.formContainer}>
            <input
              className={styles.input}
              type='text'
              placeholder='Title'
              name='title'
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <input
              className={styles.input}
              type='text'
              placeholder='Director'
              name='director'
              onChange={e => setDirector(e.target.value)}
              value={director}
            />
            <Button
              className={styles.submit}
              bgColor='#660080'
              textColor='white'
              onClick={() => onSubmit()}
              title='Search'
            />
          </div>
        </div>
      )}
    </span>
  )
}

SearchMovie.defaultProps = {}

SearchMovie.propTypes = {}

export default SearchMovie
