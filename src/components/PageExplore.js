import React from 'react'

import { useSelector } from 'react-redux'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as OneStar } from '../assets/images/OneStar.svg'
import { ReactComponent as ThreeStars } from '../assets/images/ThreeStars.svg'

import CardCollection from './CardCollection'
import CardLink from './CardLink'

import List from './styled/List'
import Main from './styled/Main'

const MainPageExplore = styled(Main)`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const ExploreHeader = styled.div`
  width: 100%;
  display: block;
  padding: 16px 0 36px 0;

  > h1,
  p {
    width: fit-content;
    margin: 0 auto;
  }
`
const Section = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;

  > section {
    width: 50%;
    padding: 12px;

    > div:not(:first-child) {
      margin-left: 18px;
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    width: 100%;
    > section {
      width: 100%;
    }
  }
`
const HeaderWithLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;

  > h2 {
    flex-grow: 1;
    font-size: 1.3rem;
    font-family: Inter;
  }

  span {
    display: grid;
    place-items: center;
    margin-right: 2px;
    width: 16px;
    height: 16px;
    svg > path {
      fill: rgb(242, 188, 89);
    }
  }

  span.oneStar {
    padding: 1px;
  }
  span.threeStars {
    //padding-right: 1px;
  }

  a {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    line-height: 1.2;
    border-bottom: 1px solid var(--color-text-secondary);

    font-weight: 300;

    &:hover {
      opacity: 0.5;
    }
  }
`

const PageExplore = () => {
  let { path } = useRouteMatch()
  //console.log({ path, url })
  const appLinks = useSelector((state) => state.app.links)
  const appCollections = useSelector((state) => state.app.collections)

  return (
    <MainPageExplore>
      <ExploreHeader>
        <h1>Explore</h1>
        <p></p>
      </ExploreHeader>

      <Switch>
        <Route exact path={path}>
          <Section>
            <section>
              <HeaderWithLink>
                <span className='oneStar'>
                  <OneStar />
                </span>
                <h2>Links</h2>
                <Link to='/explore/links'>see all</Link>
              </HeaderWithLink>

              <List>
                {appLinks
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((link) => (
                    <CardLink key={link.id} {...link} />
                  ))}
              </List>
            </section>
            <section>
              <HeaderWithLink>
                <span className='threeStars'>
                  <ThreeStars />
                </span>
                <h2>Collections</h2>
                <Link to='/explore/collections'>see all</Link>
              </HeaderWithLink>

              <List>
                {appCollections
                .sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase())
                .map((collection) => (
                  <CardCollection key={collection.id} {...collection} />
                ))}
              </List>
            </section>
          </Section>
        </Route>
        <Route path={`${path}/links`}>
          <section>
            <p>In progress</p>
            <br />
            <Link to={`${path}`}> &larr; Back to Explore</Link>
          </section>
        </Route>
        <Route path={`${path}/collections`}>
          <section>
            <p>In progress</p>
            <br />
            <Link to={`${path}`}> &larr; Back to Explore</Link>
          </section>
        </Route>
        <Route path={`${path}/*`}>
          <p>No such page</p>
        </Route>
      </Switch>
    </MainPageExplore>
  )
}

export default PageExplore
