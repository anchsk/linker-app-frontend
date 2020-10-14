import React from 'react'

import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import {
  setNotificationError,
  setNotificationSuccess,
} from '../redux/notifications/notifications.actions'
import { deleteCollection } from '../redux/user/user.actions'

import CardLink from './CardLink'
import PageCollectionHeader from './PageCollectionHeader'
import ToggleFormAddLinks from './ToggleFormAddLinks'

import Button from './styled/Button'
import List from './styled/List'
import Main from './styled/Main'

const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  .buttonDelete {
    align-self: flex-end;
  }
`

const propTypes = {
  created_at: PropTypes.string,

  description: PropTypes.string,

  id: PropTypes.string,
  //links: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  updated_at: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.name,
      username: PropTypes.string,
    }),
    PropTypes.string,
  ]),
}

const defaultProps = {
  description: '',
}

const PageCollectionUser = ({
  id,
  links,
  name,
  description,
  created_at,
  updated_at,
  user,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const linksInState = useSelector((state) => state.user.links)

  //links in collection with collectionId
  const linksInCollection =
    linksInState &&
    linksInState.filter((link) => (link.collections.includes(id) ? link : null))

  const handleDeleteCollection = (e) => {
    e.preventDefault()
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? Links will not be deleted.`
      )
    ) {
      try {
        dispatch(deleteCollection(id))
        setNotificationSuccess(`Collection '${name}' was deleted.`)
        history.push('/')
      } catch (err) {
        setNotificationError(
          `Couldn't delete collection. Error: ${err.message}`
        )
      }
    }
  }

  return (
    <StyledMain>
      <PageCollectionHeader description={description} name={name} />
      <ToggleFormAddLinks
        collection={{
          created_at,
          description,
          id,
          links,
          name,
          updated_at,
          user,
        }}
      />

      <List>
        {linksInCollection
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((link) => (
            <CardLink key={link.id} inCollection withControls {...link} />
          ))}
      </List>

      <Button delete className='buttonDelete' onClick={handleDeleteCollection}>
        Delete collection
      </Button>
    </StyledMain>
  )
}

PageCollectionUser.propTypes = propTypes
PageCollectionUser.defaultProps = defaultProps

export default PageCollectionUser
