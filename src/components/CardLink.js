import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import unescape from 'validator/lib/unescape'

import {
  setNotificationError,
  setNotificationSuccess
} from '../redux/notifications/notifications.actions'
import {
  deleteOneLink,
  removeLinkFromCollection,
} from '../redux/user/user.actions'

import AddedBy from './AddedBy'
import ToggleDiv from './ToggleDiv'

import ButtonMenu from './styled/ButtonMenu'
import Url from './styled/Url'

const StyledCardLink = styled.div`
  background-color: none;
  padding: 3px 0;
  margin-bottom: 10px;

  > p,
  a {
    font-size: 0.9rem;
  }

  > .cardHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    > h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-right: 24px;
      line-height: 1.1;
      margin-bottom: 3px;
    }
  }

  a {
    margin-bottom: 6px;
  }

  p.description {
    line-height: 1.3;
    color: var(--color-text-secondary);
  }

  /*  ${(props) => {
    if (props.withControls) {
      return `
      background-color: aliceblue;`
    }
  }} */
`

const propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  created_at: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  inCollection: PropTypes.bool,
  likes: PropTypes.number,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tagname: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
  updated_at: PropTypes.string,
  url: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.name,
      username: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  withContols: PropTypes.bool,
}

const CardLink = ({
  id,
  title,
  url,
  description,
  user,
  inCollection,
  withControls,
}) => {
  const dispatch = useDispatch()

  // If inside collection page
  const collectionId = useParams().id

  /* const shortDescription = description
    ? unescape(description).substring(0, 100).concat('...')
    : '' */
  const fullDescription = unescape(description)

  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const handleRemoveFromCollection = (e) => {
    e.preventDefault()
    try {
      dispatch(removeLinkFromCollection(collectionId, id))
      setIsToggleOpen(false)
      dispatch(setNotificationSuccess('Link was removed from collection.'))
    } catch (err) {
      dispatch(setNotificationError(`Couldn't remove link. Error: ${err.message}`))
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this link? ')) {
      try {
        dispatch(deleteOneLink(id))
        setIsToggleOpen(false)
        window.scrollTo(0, 0)
        dispatch(setNotificationSuccess('Link was deleted.'))
      } catch (err) {
        dispatch(setNotificationError(`Couldn't delete link. Error: ${err.message}`))
      }
    }
  }

  return (
    <StyledCardLink inCollection={inCollection}>
      <div className='cardHeader'>
        <h4>{title}</h4>
        {withControls && (
          <ToggleDiv isToggleOpen={isToggleOpen}>
            {inCollection && (
              <ButtonMenu onClick={handleRemoveFromCollection}>
                Remove from collection
              </ButtonMenu>
            )}
            <ButtonMenu onClick={handleDelete}>Delete link</ButtonMenu>
          </ToggleDiv>
        )}
      </div>
      <Url href={url} rel='noopener noreferrer' tagret='_blank'>
        {url}
      </Url>
      <p className='description'>{fullDescription}</p>
      <div>
        {/* {tags.map((tag) => (
          <span key={tag.id}>{tag.tagname}</span>
        ))} */}
      </div>

      {!withControls && <AddedBy username={user.username} />}
    </StyledCardLink>
  )
}

CardLink.propTypes = propTypes

export default CardLink
