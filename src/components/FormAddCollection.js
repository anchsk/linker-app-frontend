import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setNotificationError, setNotificationSuccess } from '../redux/notifications/notifications.actions'
import { addNewCollection } from '../redux/user/user.actions'

import Button from './styled/Button'
import Input from './styled/Input'
import InputError from './styled/InputError'
import Label from './styled/Label'

const StyledForm = styled.form`
  background-color: var(--color-bg);
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 200px;
  margin: 0 auto;
  padding: 12px;

  > * {
    max-width: 240px;
  }

  /*  span.validity {
    width: fit-content;
    align-self: flex-end;
    position: relative;
    line-height: 0;
    bottom: 12px;
  }  */
`

const FormAddCollection = () => {


  const dispatch = useDispatch()
  const [collectionName, setCollectionName] = useState('')
  const [error, setError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInputChange = (e) => {
    e.preventDefault()

    setCollectionName(e.target.value)

    if (e.target.value.length > 150) {
      e.target.setCustomValidity('Too long')
    } else if (e.target.value.length < 3) {
      e.target.setCustomValidity('Name should have at least 3 characters')
    } else {
      e.target.setCustomValidity('')
    }
    //console.log('e.target.validationMessage', e.target.validationMessage)
    setError(e.target.validationMessage)

    if (!error) {
      setIsFormValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let thisForm = document.querySelector('#form-add-collection')
    if (thisForm.checkValidity()) {
      dispatch(addNewCollection(collectionName))
      setError('')
      setCollectionName('')
      window.scrollTo(0, 0)
      setCollectionName('')
      dispatch(setNotificationSuccess(`Collection "${collectionName}" was created`))
    } else {
      dispatch(setNotificationError('Error creating new collection'))
    }
  }

  return (
    <StyledForm id="form-add-collection" onSubmit={handleSubmit}>
      <Label htmlFor="collection">New collection:</Label>
      <InputError>{error}</InputError>
      <Input
        required
        name="collection"
        placeholder="Enter collection name"
        type="text"
        value={collectionName}
        onChange={handleInputChange}
      />
      <Button primary disabled={!isFormValid} type="submit">
        Create collection
      </Button>
    </StyledForm>
  )
}

export default FormAddCollection
