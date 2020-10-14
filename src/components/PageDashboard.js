import React from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import CardCollection from './CardCollection'
import CardLink from './CardLink'
import FormAddCollection from './FormAddCollection'
import FormAddLink from './FormAddLink'
import Loader from './Loader'
import ToggleDiv from './ToggleDiv'

import List from './styled/List'
import Main from './styled/Main'

const StyledSection = styled.section`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;

  > section {
    width: 50%;
    margin-bottom: 24px;

    .sectionHeader {
      display: flex;
      flex-direction: row;
      align-items: space-between;
      position: relative;
      h3 {
        margin-bottom: 12px;
        span {
          margin-bottom: 12px;
          opacity: 0.3;
        }
      }
    }
  }

  > section:last-of-type {
    margin-left: 24px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
    align-items: center;

    > section {
      width: 100%;
    }
    > section:last-of-type {
      margin-left: 0;
    }
  }
`

const PageDashboard = () => {
  const { links, collections } = useSelector((state) => state.user)

  return (
    <Main>
      <FormAddLink />

      <StyledSection>
        <section>
          <div className='sectionHeader'>
            <h3>My links{links && <span>({links.length})</span>}</h3>
          </div>
          {!links && <Loader />}
          {links && (
            <List>
              {links
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((link) => (
                  <CardLink key={link.id} withControls {...link} />
                ))}
            </List>
          )}
        </section>
        <section>
          <div className='sectionHeader'>
            <h3>
              My collections{collections && <span>({collections.length})</span>}
            </h3>
            <ToggleDiv toggleVariant='add'>
              <FormAddCollection />
            </ToggleDiv>
          </div>
          {!collections && <Loader />}
          {collections && (
            <List>
              {collections.map((collection) => (
                <CardCollection key={collection.id} {...collection} />
              ))}
            </List>
          )}
        </section>
      </StyledSection>
    </Main>
  )
}

/* PageDashboard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  links: PropTypes.array,
  collections: PropTypes.array,
  liked: PropTypes.array
} */

export default PageDashboard
