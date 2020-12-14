import React, { useState } from 'react'
import styles from './EditMovie.module.scss'
import { Button } from '../../components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
const MySwal = withReactContent(Swal)
const url = process.env.REACT_APP_API_URL

const EditMovie = () => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [rating, setRating] = useState('')
  const [summary, setSummary] = useState('')

  const incompleteData = () => {
    return !id || !title || !director || !rating || !summary
  }

  const onSubmit = async () => {
    if (incompleteData()) {
      MySwal.fire({
        title: 'Data masih ada yang kosong',
        icon: 'warning',
        text: 'Cek lagi data movie',
        timer: 2000
      })
    } else {
      try {
        console.log(url)
        const res = await axios.patch(url + '/movies', {
          id: id,
          title: title,
          director: director,
          summary: summary,
          rating: rating
        })
        if (res.status === 200) {
          MySwal.fire({
            title: 'Updated Movie',
            icon: 'success',
            timer: 2000,
            text: `New Movie title: ${res.data.movie.title}`
          })
        }
      } catch (e) {
        if (e.response.status === 404) {
          MySwal.fire({
            title: 'No Movie Found',
            icon: 'error',
            text: 'Check the id again',
            timer: 2000
          })
        } else if (e.response.status === 400) {
          MySwal.fire({
            title: 'Id not valid',
            icon: 'error',
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
    <div className={styles.container}>
      <div className={styles.title}>Edit Movie</div>
      <div className={styles.formContainer}>
        <input
          className={styles.input}
          type='text'
          placeholder='Movie Id'
          name='id'
          onChange={e => setId(e.target.value)}
          value={id}
        />
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
        <input
          className={styles.input}
          type='number'
          placeholder='Rating'
          name='rating'
          onChange={e => setRating(e.target.value)}
          value={rating}
        />
        <textarea
          className={styles.input}
          type='textarea'
          placeholder='Summary'
          name='summary'
          onChange={e => setSummary(e.target.value)}
          value={summary}
        />
        <Button
          className={styles.submit}
          bgColor='#660080'
          textColor='white'
          onClick={() => onSubmit()}
          title='Edit'
        />
      </div>
    </div>
  )
}

EditMovie.defaultProps = {}

EditMovie.propTypes = {}

export default EditMovie
