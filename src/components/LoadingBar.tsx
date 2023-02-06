import styled, { keyframes } from "styled-components";

export default function LoadingBar() {
  return (
    <LoadingBarWrapper>
      <Container>
        <ProgressBar />
      </Container>
    </LoadingBarWrapper>
  );
}

const progressKeyframe = keyframes`
  0% {
    width: 0%;
  }
  25% {
    width: 50%;
  }
  50% {
    width: 75%;
  }
  75% {
    width: 85%;
  }
  100% {
    width: calc(100% - 0.6rem);
  }
`;

const LoadingBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0%;
  left: 0%;
`;

const Container = styled.div`
  position: relative;
  height: 2.6rem;
  width: min(56%, calc(${({ theme }) => theme.breakpoints.mobile} * 0.78));
  padding: 0.3rem;
  border: 0.5rem solid ${({ theme }) => theme.colors.primary.dark + "50"};
  border-radius: 5px;
`;

const ProgressBar = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary.dark + "70"};
  width: 0px;
  height: 1rem;
  border-radius: 2px;
  animation: ${progressKeyframe} 4s infinite linear;
`;
