import styled, { css, keyframes } from 'styled-components';

export const Logo = styled.div`
  background: #fff;
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
    color: #7159c1;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  position: relative;

  .error {
    position: absolute;
    left: 0;
    bottom: -22px;
    font-size: 13px;
    font-weight: 500;
    color: #d45353;
    display: inline-block;
  }
`;

export const FormInput = styled.input.attrs((props) => ({
  disabled: props.isLoading,
}))`
  flex: 1;
  border: 1px solid ${(props) => (props.error ? '#d45353' : '#eee')};
  padding: 0 15px;
  height: 50px;
  border-radius: 4px;
  font-size: 16px;
  min-width: 0;
  color: #333;

  &[disabled] {
    cursor: not-allowed;
    background: #eee;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #7159c1;
  border: 0;
  margin-left: 10px;
  border-radius: 4px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${(props) => props.isLoading && css`
    cursor: not-allowed;
    opacity: 0.7;

    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `};
`;

export const List = styled.ul`
  list-style: none;
  li {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      margin-top: 30px;
    }

    &:last-child {
      padding-bottom: 0;
    }

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      display: flex;
      align-items: center;
      flex: 1;
      margin-right: 15px;
      text-decoration: none;
      max-width: calc(100% - 75px);

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid #eee;
      }

      span {
        color: #444;
        font-weight: 550;
        font-size: 16px;
        transition: color 0.3s;
        margin-left: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:hover {
        span {
          color: #7159c1;
        }
      }
    }

    button {
      display: flex;
      flex: 0 0 60px;
      background: transparent;
      height: 30px;
      border: 0;

      svg {
        color: #666;
        width: 16px;
        height: 16px;
        margin: 0 auto;
        transition: color 0.3s;
      }

      &:hover svg {
        color: #7159c1;
      }
    }
  }
`;
