import styled from "styled-components";

export const ChatBoxContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 8rem;

  position: relative;
  width: 100%;
  height: 100%;
  max-width: 48rem;

  padding: 0 1.75rem;

  background-color: ${({ theme }) => theme.colors.green.main};
`;

export const ChatBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0px;
  gap: 2rem;
`;

export const ChatBoxNavbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem 1.75rem 2.75rem;
  gap: 1rem;
`;

export const ChatBoxForm = styled.form``;

export const ChatBoxInput = styled.input`
  width: 100%;

  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;
`;
