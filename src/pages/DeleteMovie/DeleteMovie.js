import React, { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styles from './DeleteMovie.module.scss'
import { Button } from '../../components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)
const url = process.env.REACT_APP_API_URL

const DeleteMovie = props => {
  const [id, setId] = useState('')

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
        const res = await axios.delete(url + '/movies/' + id)
        if (res.status === 200) {
          MySwal.fire({
            title: 'Success Deleted Movie',
            icon: 'success',
            text: `Movie Deleted: ${res.data.movie.title}`,
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
      <div className={styles.title}>Delete a Movie</div>
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
          bgColor='#660080'
          textColor='white'
          onClick={() => onSubmit()}
          title='Delete'
        />
      </div>
    </div>
  )
}

DeleteMovie.defaultProps = {}

DeleteMovie.propTypes = {}

export default DeleteMovie
