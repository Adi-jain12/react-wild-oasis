import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: var(--color-brand-600);
  color: var(--color-brand);
  cursor: pointer;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Button onClick={() => alert("Hello")}>Button 1</Button>
      </StyledApp>
    </>
  );
};

export default App;
