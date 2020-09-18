import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { SET_BIRTHYEAR } from '../queries'

const BirthYearForm = ({
  setError,
  authors
}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [setBirthyear, result] = useMutation(SET_BIRTHYEAR, {
    onError: error => {
      setError(error.message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    setBirthyear({
      variables: {
        name,
        born: Number(born)
      }
    })

    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {
              authors.map((a, i) => {
                return i === 0
                  ? <option value="">select</option>
                  : <option value={a.name}>{a.name}</option>
              })
            }
          </select>
        </div>
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm