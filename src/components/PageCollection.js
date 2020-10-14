import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Loader from './Loader'
import PageCollectionFetched from './PageCollectionFetched'
import PageCollectionUser from './PageCollectionUser'

import Main from './styled/Main'

// /c/:id
const PageCollection = () => {
  let collectionId = useParams().id

  const userCollection = useSelector(
    (state) =>
      state.user.collections &&
      state.user.collections.filter((col) => col.id === collectionId)
  )

  if (userCollection === undefined) {
    return (
      <Main>
        <Loader />
      </Main>
    )
  }

  if (userCollection.length !== 0) {
    return <PageCollectionUser {...userCollection[0]} />
  }

  return <PageCollectionFetched />
}

export default PageCollection
