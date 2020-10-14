import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import escape from 'validator/lib/escape'

import checkValidUrl from '../helpers/validator'
import { setNotificationError, setNotificationSuccess } from '../redux/notifications/notifications.actions'
import { setFormIsLoading, setFormReset } from '../redux/ui/ui.actions'
import { addNewLink } from '../redux/user/user.actions'
import meta from '../services/meta'

import ButtonIcon from './ButtonIcon'
import Loader from './Loader'

import Button from './styled/Button'
import ButtonContinue from './styled/ButtonContinue'
import ButtonReset from './styled/ButtonReset'
import Input from './styled/Input'
import InputError from './styled/InputError'
import Label from './styled/Label'
import Textarea from './styled/Textarea'

const StyledForm = styled.form`
  border: var(--border);
  border-radius: 4px;
  margin: 24px auto;
  padding: 18px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 400px) {
    width: 100%;
  }

  min-width: 240px;
  width: 50%;

  /* .addLinkFormLoader {
    padding: 12px;
  } */

  button.buttonClose {
    position: absolute;
    align-self: flex-end;
    top: 12px;
    width: 16px;
    height: 16px;

    &:hover {
      color: black;
    }
  }

  > * {
    width: 100%;
  }

  > .buttonContinue {
    width: fit-content;
    position: relative;
    align-self: flex-end;
  }

  span.validity {
    width: fit-content;
    align-self: flex-end;
    position: relative;
    line-height: 0;
    bottom: 24px;
  }

  span.optional {
    margin-left: 2px;
    font-size: 8px;
    display: inline-block;
    opacity: 0.5;
    vertical-align: super;
  }
`

const FormAddLink = () => {
  const dispatch = useDispatch()
  //const appTags = useSelector((state) => state.app.tags)

  /* Form validity state */
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)

  /* Meta state */
  const [metaState, setMetaState] = useState({
    isLoaded: false,
    isLoading: false,
  })

  /* Form input state */
  const [state, setState] = useState({ description: '', title: '', url: '' })
  const [errors, setErrors] = useState({
    description: '',
    title: '',
    url: '',
  })

  /* Form loading state */
  const formUi = useSelector((state) => state.ui.addLinkForm)

  async function fetchMeta(url) {
    try {
      let response = await meta.getMetaData(url)
      if (response.title !== '' && response.description !== '') {
        setState({
          ...state,
          description: response.description ? response.description : '',
          title: response.title ? response.title : '',
        })
      }
      setMetaState({ isLoaded: true, isLoading: false })
      setIsValidUrl(true)
    } catch (err) {
      setMetaState({ isLoaded: false, isLoading: false })
      setIsValidUrl(false)
    }
  }

  useEffect(() => {
    if (state.url === '') {
      setMetaState({ isLoaded: false, isLoading: false })
    }
  }, [state.url])

  const handleUrlInputChange = (e) => {
    e.preventDefault()
    setState({ ...state, url: e.target.value })

    if (checkValidUrl(e.target.value)) {
      e.target.setCustomValidity('')
      setIsValidUrl(true)
    } else {
      e.target.setCustomValidity('Invalid url')
      setIsValidUrl(false)
    }
    setErrors({ ...errors, url: e.target.validationMessage })

    if (e.target.validity.valueMissing === true) {
      e.target.setCustomValidity('')
      setIsValidUrl(false)
      setErrors({ ...errors, url: '' })
    }

  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (isValidUrl) {
      fetchMeta(state.url)
      setMetaState({ isLoaded: false, isLoading: true })
    }
  }

  /* Validation on input */
  const handleInputChange = (e) => {
    e.preventDefault()
    setState({ ...state, [e.target.name]: e.target.value })

    if (e.target.name === 'title') {
      if (e.target.value.length < 5) {
        e.target.setCustomValidity('Please enter at least 5 characters')
      } else {
        e.target.setCustomValidity('')
      }
    }

    if (e.target.name === 'description') {
      if (e.target.value.length >= 500) {
        e.target.setCustomValidity('Too many characters, 300 max')
      } else {
        e.target.setCustomValidity('')
      }
    }
    setErrors({ ...errors, [e.target.name]: e.target.validationMessage })

    // To avoid showing :invalid when input is empty and out of focus
    /*  if (e.target.validity.valueMissing === true) {
      setErrors({ ...errors, [e.target.name]: '' })
    } else {
      setErrors({ ...errors, [e.target.name]: e.target.validationMessage })
    } */
  }

  // Form Ui
  useEffect(() => {
    if (formUi.isLoaded) {
      setState({ description: '', title: '', url: '' })
      setErrors({ description: '', title: '', url: '' })
      setIsValidUrl(false)
      window.scrollTo(0, 0)
      dispatch(setFormReset())
    } else {
      window.scrollTo(0, 0)
      setIsValidForm(false)
    }
  }, [dispatch, formUi.isLoaded])

  // Enable submit button when required fields are valid
  useEffect(() => {
    if (state.url !== '' && state.title !== '') {
      let thisForm = document.getElementById('addLinkForm')
      if (thisForm.checkValidity()) {
        setIsValidForm(true)
      } else {
        setIsValidForm(false)
      }
    }
  }, [state])

  const handleSubmit = (e) => {
    e.preventDefault()
    let thisForm = document.getElementById('addLinkForm')
    if (thisForm.checkValidity() === true) {
      let sanitizedDescription = escape(state.description)
      try {
      dispatch(
        addNewLink({
          description: sanitizedDescription,
          title: state.title,
          url: state.url,
        })
      )
      dispatch(setFormIsLoading())
      dispatch(setNotificationSuccess('Successfully added new link!'))
      } catch(err) {
        dispatch(setNotificationError(`Error adding new link. Error: ${err.message}`))
      }

    } else {
      setIsValidForm(false)
      window.scrollTo(0, 0)
    }
  }

  const handleFormReset = (e) => {
    e.preventDefault()
    setState({ description: '', title: '', url: '' })
    setErrors({ description: '', title: '', url: '' })
    setIsValidUrl(false)
    setMetaState({ isLoaded: false, isLoading: false })
  }

  return (
    <StyledForm
      noValidate
      autoComplete="off"
      id="addLinkForm"
    >
      {isValidUrl && (
        <ButtonIcon
          className="buttonClose"
          handleClick={handleFormReset}
          variant="close"
        />
      )}

      {/* <h3>Add new link</h3> */}

      {!metaState.isLoaded && <Label htmlFor="url">Add new link: </Label>}

      {metaState.isLoaded && (
        <Label required htmlFor="url">
          Url
        </Label>
      )}
      <InputError>{errors.url}</InputError>
      <Input
        required
        name="url"
        placeholder="https://example.com"
        type="url"
        value={state.url}
        onChange={handleUrlInputChange}
      />
      <span className="validity"></span>
      {!metaState.isLoaded && !metaState.isLoading && (
        <ButtonContinue
          className="buttonContinue"
          disabled={!isValidUrl}
          type="submit"
          onClick={handleContinue}
        >
          Continue &rarr;
        </ButtonContinue>
      )}

      {isValidUrl && metaState.isLoading && (
        <div className="addLinkFormLoader">
          <Loader />
        </div>
      )}

      {isValidUrl && metaState.isLoaded && (
        <>
          <Label required htmlFor="title">
            Title
          </Label>
          <InputError>{errors.title}</InputError>
          <Input
            required
            minLength="5"
            name="title"
            placeholder="Title"
            type="text"
            value={state.title}
            onChange={handleInputChange}
          />
          <span className="validity"></span>

          <Label htmlFor="description">
            Description<span className={'optional'}>optional</span>
          </Label>
          <InputError>{errors.description}</InputError>

          <Textarea
            name="description"
            placeholder="Description"
            rows="7"
            type="text"
            /* cols should be removed to make width flexible */
            /* cols="20" */
            value={state.description}
            onChange={handleInputChange}
          />
          <span className="validity"></span>

          {formUi.isLoading && (
            <div className="addLinkFormLoader">
              <Loader />
            </div>
          )}
          {!formUi.isLoading && !formUi.isLoaded && (
            <>
              <Button primary disabled={!isValidForm} name='' type="submit"
      onClick={handleSubmit}>
                Save
              </Button>
              <ButtonReset type="reset" onClick={handleFormReset}>
                Reset
              </ButtonReset>
            </>
          )}
        </>
      )}
    </StyledForm>
  )
}

export default FormAddLink
