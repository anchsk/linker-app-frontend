import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setNotificationError,
  setNotificationSuccess,
} from '../redux/notifications/notifications.actions'
import { addLinksToCollection } from '../redux/user/user.actions'

import Loader from './Loader'

import Button from './styled/Button'

const StyledForm = styled.form`
  padding: 0 12px;
  h3 {
    margin-bottom: 3px;
  }

  .linksView {
    border: 1px solid var(--color-accent);
    height: 300px;
    overflow: scroll;
    margin-bottom: 6px;
    padding: 12px;
  }

  .linkToSelect {
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;
    justify-content: flex-start;
    font-size: 0.9em;

    .label {
      > a,
      label {
        display: block;
        width: fit-content;
      }
      margin-left: 6px;
      padding: 3px;
      border-radius: var(--border-radius);
      flex-grow: 1;
    }
  }
`

const FormAddLinksToCollection = ({ collection, setSubmitted }) => {
  const [linksToAdd, setLinksToAdd] = useState([])
  const dispatch = useDispatch()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  //Links not present in collection yet
  const links = useSelector((state) =>
    state.user.links
      ? state.user.links
          .filter(
            (link) =>
              link.collections.length === 0 ||
              !link.collections.includes(collection.id)
          )
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      : null
  )

  const handleCheckboxChange = (e) => {
    // e.preventDefault()
    setIsFormSubmitted(false)
    //console.log(e.target.checked)
    //console.log(e.target.id)
    if (e.target.checked) {
      setLinksToAdd([...linksToAdd, e.target.id])
    } else {
      setLinksToAdd(linksToAdd.filter((link) => link !== e.target.id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const modifiedCollection = {
      ...collection,
      links: collection.links.concat(linksToAdd),
      name: collection.name,
      user: collection.user.id,
    }
    try {
      dispatch(addLinksToCollection(modifiedCollection))
      setLinksToAdd([])
      setIsFormSubmitted(true)
      setNotificationSuccess(`Successfully added ${linksToAdd.length} links`)
    } catch (err) {
      setIsFormSubmitted(false)
      setNotificationError(`Couldn't add links. Error: ${err.message}`)
    }
  }

  useEffect(() => {
    if (isFormSubmitted) {
      setSubmitted()
    }
  }, [isFormSubmitted, setSubmitted])

  if (!links) {
    return <Loader />
  }

  return (
    <StyledForm id='addManyLinks' onSubmit={handleSubmit}>
      <h3>Select links to add:</h3>
      <div className='linksView'>
        {links.map((link) => (
          <div key={link.id} className='linkToSelect'>
            <input
              id={link.id}
              name={`${link.title.slice(0, 10)}`}
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <div className={'label'}>
              <label htmlFor={`${link.title.slice(0, 10)}`}>{link.title}</label>
              <a href={link.url}>{link.url}</a>
            </div>
          </div>
        ))}
      </div>
      <Button
        primary
        disabled={linksToAdd.length !== 0 ? false : true}
        type='submit'
      >
        Add selected links
      </Button>{' '}
      <input type='reset' />
    </StyledForm>
  )
}

export default FormAddLinksToCollection
