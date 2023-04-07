

import styled from 'styled-components';

const InputStyled = styled.input`
  outline: none;
  border: 1px solid #999;
  font-size: inherit;
  text-align: inherit;
  font-family: inherit;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
`;

interface InputProps {
  name: string;
  value: string;
  onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputProps> = props => {
  const {
    name,
    value,
    onChange,
    placeholder,
    className,
  } = props;

  return (
    <InputStyled
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
