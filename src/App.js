import React from 'react';
import LoanCalculator from './components/LoanCalculator';
import styled from 'styled-components';
import mediaQueries from '../src/components/media-queries';

const Container= styled.div`
background: url(https://cdn.corporatefinanceinstitute.com/assets/Loans-1.jpeg);
background-size: cover;
background-position: center;
${mediaQueries.desktop`
  height:125vh;
  width: 100vw;
`}

`

function App() {
  return (
    <Container>
        <LoanCalculator />
    </Container>
  );
 }
export default App;
