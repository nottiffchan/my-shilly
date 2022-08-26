import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Button = ({ children, onClick, variant="primary", disabled=false, size='big', loading=false, ...props }) => {
	return (
    <ShillyButton
      className={`${disabled || loading ? 'disabled' : ''} ${variant} ${size}`}
      onClick={ disabled ? () => {} : onClick }
      {...props}
    >
      { loading 
        ? <Spinner animation="border"  variant="light" />
        : children
      }
    </ShillyButton>
	);
};

const ShillyButton = styled.button`
  font-weight: bold;
  transition: 200ms ease-out;
  border-radius: var(--br-lg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 16px 24px; 

  &.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none!important;
  }

  &.small {
    height: 40px;
    border-radius: var(--br-md);
  }
  &.big {
    height: auto;
  }


  &.primary {
    color: var(--base-10);
    background-color: var(--accent-pink);
  }
  &.primary:hover {
    background-color: var(--accent-pink-darker);
    box-shadow: var(--shadow);
  }


  &.secondary {
    color: var(--base);
    background-color: var(--base-20);
  }
  &.secondary:hover {
    background-color: var(--base-30);
    box-shadow: var(--shadow);
  }


  &.tertiary {
    color: var(--base);
    background-color: transparent;
    border: 2px solid var(--base-30);
  }
  &.tertiary:hover {
    border: 2px solid var(--base-40);
  }


  &.destructive {
    color: var(--base-10);
    background-color: var(--accent-error);
  }
  &.destructive:hover {
    background-color: var(--accent-error-darker);
  }
`;

export default Button;