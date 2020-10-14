import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { setNotificationError } from '../redux/notifications/notifications.actions'
import collections from '../services/collections'

import CardLink from './CardLink'
import Loader from './Loader'
import NotFound from './NotFound'
import PageCollectionHeader from './PageCollectionHeader'

import List from './styled/List'
import Main from './styled/Main'

// /c/:id
const PageCollectionFetched = () => {
  let collectionId = useParams().id

  const [collection, setCollection] = useState()

  useEffect(() => {
    async function fetchCollection(id) {
      try {
        let fetched = await collections.getById(id)
        setCollection(fetched)
      } catch (err) {
        setNotificationError(err.message)
      }
    }
    fetchCollection(collectionId)
  }, [collectionId])

  if (collection === undefined) {
    return (
      <Main>
        <Loader />
      </Main>
    )
  }

  if (collection === null) {
    return <NotFound explanation={'Collection does not exist'} />
  }

  return (
    <Main>
      <PageCollectionHeader
        description={collection.description}
        name={collection.name}
        username={collection.user.username}
      />
      {collection.links.length === 0 ? (
        <p>No links yet</p>
      ) : (
        <List>
          {collection.links
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((link) => (
              <CardLink key={link.id} {...link} />
            ))}
        </List>
      )}
    </Main>
  )
}

export default PageCollectionFetched
