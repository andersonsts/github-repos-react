import styled from 'styled-components';

export const Logo = styled.div`
  background: #7159c1;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: inline-flex;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);

  svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;

export const Form = styled.form``;

export const FormInput = styled.input.attrs((props) => ({
  disabled: props.isLoading,
}))``;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.isLoading,
}))``;

export const List = styled.ul``;
