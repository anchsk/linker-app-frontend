import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { removeNotificationFor } from '../redux/notifications/notifications.actions'

import ButtonIcon from './ButtonIcon'

const NotificationsSection = styled.section`
  position: absolute;

  top: 40px;
  left: 12px;
  right: 12px;

  display: flex;

  font-size: 12px;
  z-index: 100;
  flex-direction: column;
`
const StyledNotification = styled.div`
  div {

    ${props => {
      switch(props.type) {
      case 'error':
        return `
        border: 2px solid var(--color-invalid);

       /*  > p {
        color: var(--color-invalid);
        } */
        
        svg > path {
          stroke: var(--color-invalid);
        }`

      case 'success':
        return `
        color: var(--color-valid);
        border: 2px solid var(--color-valid);

        svg > path {
          stroke: var(--color-valid);
        }      
        `
      default:
        return''
      }
    }
    }
    background-color: ${(props) =>
      props.type === 'error' ? '#f8dbe2' : '#ECFFE0'}; 
    border-radius: 4px;
    width: 100%;
    align-self: center;
    padding: 8px;
    max-width: 400px;
    //min-width: fit-content;
    display: flex;
    margin: 0 auto;
    margin-bottom: 6px;
    position: relative;

    p {
      margin-right: 24px;
    }

    button {
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 8px;
      background: transparent;
      border: none;
    
    }
    }
  }

`

const Notification = () => {
  const notifications = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const handleCloseClick = (e) => {
    e.preventDefault()
    //console.log(e.target.attributes)
    //console.log(e.target.id)
    dispatch(removeNotificationFor(e.target.parentNode.id))
  }
  if (notifications.length === 0) {
    return null
  }

  return (
    <NotificationsSection>
      {notifications.map((notification) => (
        <StyledNotification key={notification.id} type={notification.style}>
          <div>
            <p>{notification.message}</p>
            <ButtonIcon
            handleClick={handleCloseClick}
              id={notification.id}
              variant={'close'}

            />
            {/* <button id={notification.id} onClick={handleCloseClick}>x</button> */}
          </div>
        </StyledNotification>
      ))}
    </NotificationsSection>
  )
}

export default Notification
