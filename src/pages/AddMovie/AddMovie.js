import React, { useState } from 'react'
import styles from './AddMovie.module.scss'
import { Button } from '../../components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
const MySwal = withReactContent(Swal)
const url = process.env.REACT_APP_API_URL

const AddMovie = () => {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [rating, setRating] = useState('')
  const [summary, setSummary] = useState('')

  const incompleteData = () => {
    return !title || !director || !rating || !summary
  }

  const checkRating = rating => {
    return !(rating < 0 || rating > 5)
  }

  const onSubmit = async () => {
    if (incompleteData()) {
      MySwal.fire({
        title: 'Data masih ada yang kosong',
        icon: 'warning',
        text: 'Cek lagi data movie',
        timer: 2000
      })
    } else if (checkRating(rating)) {
      try {
        console.log(url)
        const res = await axios.post(url + '/movies', {
          title: title,
          director: director,
          summary: summary,
          rating: rating
        })
        if (res.status === 201) {
          MySwal.fire({
            title: 'Added movie',
            icon: 'success',
            timer: 2000,
            text: `Movie title: ${res.data.movie.title}`
          })
        }
      } catch (e) {
        MySwal.fire({
          title: 'Something bad happen',
          icon: 'error',
          timer: 2000
        })
      }
    } else {
      MySwal.fire({
        title: 'Rating rentang 0-5 gan',
        icon: 'warning',
        text: 'Masukin lagi rating yang bener gan',
        timer: 2000
      })
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Add Movie</div>
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
          title='Add'
        />
      </div>
    </div>
  )
}

AddMovie.defaultProps = {}

AddMovie.propTypes = {}

export default AddMovie
