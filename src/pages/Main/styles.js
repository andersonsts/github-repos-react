import styled from 'styled-components';

export const Logo = styled.div``;

export const Form = styled.form``;

export const FormInput = styled.input.attrs((props) => ({
  disabled: props.isLoading,
}))``;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.isLoading,
}))``;

export const List = styled.ul``;
