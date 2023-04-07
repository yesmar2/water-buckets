import styled from 'styled-components';

const ButtonStyled = styled.button`
  border: 1px solid #3fa7d6;
  border-radius: 4px;
  margin: 0;
  padding: 4px 8px;
  width: auto;
  overflow: visible;
  background-color: transparent;
  color: #3fa7d6;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
`;

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, children, onClick, disabled } = props;

  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
