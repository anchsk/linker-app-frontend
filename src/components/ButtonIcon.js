import React from 'react'

import styled from 'styled-components'

import { ReactComponent as ArrowDown } from '../assets/images/ArrowDown.svg'
import { ReactComponent as Dots } from '../assets/images/Dots.svg'
import { ReactComponent as Heart } from '../assets/images/Heart.svg'
import { ReactComponent as Plus } from '../assets/images/Plus.svg'
import { ReactComponent as X } from '../assets/images/X.svg'


/**
 * @prop { handleClick } function for onClick event
 * ButtonIcon SHOULD HAVE { handleClick } property to accept
 * click events from parent component.
 *
 * @prop { variant } string
 * "close"
 * "open"
 *
 * @prop { className } string
 * ButtonIcon accept { className } to modify styles from parent
 * component. Default styles will be overwritten if changed.
 *
 * <svg> colors can be modified in parent component using
 * { className } in styled parent component.
 *
 * Check <svg> element structure to apply colors to the right path
 * or stroke.
 * <svg> SHOULD have a viewBox property and should NOT have width and height
 * to be scaled and centered inside the button.
 * Default stroke color for all inside <path> elements
 * is var(--color-text-secondary)
 *
 * @prop { id }
 *
 *
 */

const StyledButtonIcon = styled.button`
  background: transparent;
  display: grid;
  place-items: center;
  border: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: var(--color-text-secondary);
  overflow: hidden;
  svg {
   //background-color: red;
  }
  * > path {
    stroke: var(--color-text-secondary);
  }
`
const ButtonIcon = ({ className, handleClick, variant, id }) => {
  return (
    <StyledButtonIcon
      className={className}
      id={id}
      type="button"
      variant={variant}
      onClick={handleClick}
    >
      {variant === 'close' && <X />}
      {variant === 'arrowdown' && <ArrowDown />}
      {variant === 'open' && <Dots />}
      {variant === 'add' && <Plus />}
      {variant === 'like' && <Heart />}
    </StyledButtonIcon>
  )
}

export default ButtonIcon
