import React from 'react'

import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
from {
 transform: rotate(0deg);
}
to {
 transform: rotate(360deg);
}`
const StyledLoader = styled.div`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  svg {
    animation: ${rotate} 2s linear infinite;
    fill: var(--text-color-base);
  }
`
const Loader = () => {
  return (
    <StyledLoader className="loader">
      <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23984 12.5233 1.21446 11.0615 0.608964C9.59966 0.00346267 7.99113 -0.154964 6.43928 0.153718C4.88743 0.4624 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.4624 4.88743 0.153718 6.43928C-0.154964 7.99113 0.00346269 9.59966 0.608964 11.0615C1.21446 12.5233 2.23984 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16L8 13.7895C6.85494 13.7895 5.73559 13.45 4.78351 12.8138C3.83142 12.1777 3.08936 11.2735 2.65117 10.2156C2.21297 9.15766 2.09832 7.99358 2.32171 6.87052C2.5451 5.74746 3.0965 4.71586 3.90618 3.90618C4.71586 3.0965 5.74746 2.5451 6.87052 2.32171C7.99358 2.09832 9.15766 2.21297 10.2156 2.65117C11.2735 3.08936 12.1777 3.83142 12.8138 4.78351C13.45 5.73559 13.7895 6.85494 13.7895 8H16Z"
          fill="black"
        />
      </svg>
    </StyledLoader>
  )
}

export default Loader
