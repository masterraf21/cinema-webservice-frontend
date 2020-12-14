import React, { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styles from './GetMovieId.module.scss'
import { Button } from '../../components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)
const url = process.env.REACT_APP_API_URL

const GetMovieId = () => {
  const [id, setId] = useState('')
  const [movie, setMovie] = useState([])

  const incompleteData = () => {
    return !id
  }

  const onSubmit = async () => {
    if (incompleteData()) {
      MySwal.fire({
        title: 'Data id kosong gan',
        icon: 'warning',
        text: 'Cek lagi id nya',
        timer: 2000
      })
    } else {
      try {
        const res = await axios.get(url + '/movies/' + id)
        if (res.status === 200) {
          var newMovie = res.data.movie
          var movieArr = [
            {
              id: newMovie._id,
              title: newMovie.title,
              director: newMovie.director,
              rating: newMovie.rating,
              summary: newMovie.summary
            }
          ]
          setMovie(movieArr)
          MySwal.fire({
            title: 'Movie found',
            icon: 'success',
            timer: 2000
          })
        }
      } catch (e) {
        if (e.response.status === 400) {
          MySwal.fire({
            title: 'Id not valid',
            icon: 'error',
            timer: 2000
          })
        } else if (e.response.status === 404) {
          setMovie([])
          MySwal.fire({
            title: 'No Movie Found',
            icon: 'error',
            text: 'Check the id again',
            timer: 2000
          })
        } else if (e.response.status === 500) {
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
    <div className={styles.container}>
      <div className={styles.title}>Find a Movie</div>
      <div className={styles.formContainer}>
        <input
          className={styles.input}
          type='text'
          placeholder='Enter Movie Id'
          name='movieid'
          onChange={e => setId(e.target.value)}
          value={id}
        />
        <Button
          className={styles.submit}
          bgColor='#24b300'
          textColor='white'
          onClick={() => onSubmit()}
          title='Find'
        />
      </div>
      <div
        style={{
          display: 'flex',
          height: '200px',
          width: '80%',
          marginTop: '30px'
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <JsonToTable json={movie} />
        </div>
      </div>
    </div>
  )
}

GetMovieId.defaultProps = {}

GetMovieId.propTypes = {}

export default GetMovieId
