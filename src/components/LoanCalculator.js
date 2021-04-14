import React, { useState } from 'react';
import styled from 'styled-components';
import mediaQueries from './media-queries';

const Container = styled.div`
display: flex;
justify-content: center;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 25px;
h1{
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 10px;
}
p{
    background-color: #fff; 
    padding: 1rem;
}  
`;

const AllContainer = styled.div`
display: flex:
flex-direction: column;
padding: 10px;
${mediaQueries.desktop`
    display: flex;
    flex-direction: row;
    flex: 1 0 0%;
`}

`

const Form = styled.form`
background-color: #f0f0f2;
align-items: left;
padding: 75px 50px 40px 60px;
`

const InputSection = styled.div`
padding-bottom: 1rem;
display: flex;
align-items: left;
flex-direction: column;
`

const Input = styled.input`
width: 100%;
padding: 12px 20px;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
&:hover {
    border-width: 2px;
    border-color:#ffa500;
  }
`

const SubmitButton = styled.button`
background-color: #726969;
color: white;
border: none;
border-radius: 2.5px;
font-weight:bold;
font-size: 15px;
margin: 10px 0px 0px 150px;
padding: 13px 20px;
letter-spacing: 1px;
cursor: pointer;
&:hover{
    opacity: 0.8;
}
`
const Error = styled.h4`
color:red;
font-size:13px;
margin-bottom: 1rem;
`
const Result = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
padding: 75px ;
`

const Hr = styled.hr`
width:100%;
`
const Span = styled.span`
background-color:white;
margin:  2px;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
padding: 12px 10px;
input{
    width: 90%;
    padding: 0px 5px;
    border: none;  
}
&:hover {
    border-width: 2px;
    border-color:#ffa500;
  }
`

const LoanCalculator = () => {

    // state to storage the values given by the user when filling the input fields
    const [userValues, setUserValues] = useState({
        amount: '5000',
        interest: '4.5',
        years: '5',
        months: '60'
    });

    // state to storage the results of the calculation
    const [results, setResults] = useState({
        monthlyPayment: '93.22',
        totalPayment: '5000',
        totalInterest: '592.91',
    });

    // state to storage error message
    const [error, setError] = useState('');

    // event handler to update state when the user enters values
    const timeChange = (e) => {
        if (e.target.name === 'months' && e.target.value) {
            let m = e.target.value
            let y = m / 12
            setUserValues(userValues.years = y)
        }
        else if (e.target.name === 'years' && e.target.value) {
            let yr = e.target.value
            let mo = yr * 12
            setUserValues(userValues.months = mo)
        }
    }

    const handleInputChange = (event) => {
        timeChange(event)
        setUserValues({ ...userValues, [event.target.name]: event.target.value });
    }
    // Manage validations and error messages

    const isValid = () => {
        const { amount, interest, years, months } = userValues;
        let actualError = {};
        if (amount ==='') {
            actualError.amount = `Invalid loan amount`;
        }
        if (isNaN(amount)) {
            actualError.amount = `Invalid loan amount`;
        }
        if (Number(amount) <= 0) {
            actualError.amount = `Invalid loan amount`;
        }
        if (!interest) {
            actualError.interest = 'Invalid interest rate';
        }
        if (isNaN(interest)) {
            actualError.interest = 'Invalid interest rate';
        }
        if (Number(interest) <= 0 || Number(interest) > 99) {
            actualError.interest = 'Invalid interest rate';
        }

        if (!years || isNaN(years) || Number(years) <= 0) {
            actualError.years = 'Invalid loan term';
        }

        if (!months || isNaN(months) || Number(months) <= 0) {
            actualError.months = 'Invalid loan term';
        }
        if (actualError) {
            setError(actualError);
            return false;
          }
          return true;
    };

    // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
    const handleSubmitValues = (e) => {
        e.preventDefault();
        if (isValid()) {
            setError({});
        }
        calculateResults(userValues);

    };

    // Calculation
    const calculateResults = ({ amount, interest, years }) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100 / 12;
        const calculatedPayments = Number(years) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalPaymentCalculated = Math.trunc(userAmount);
            const totalInterestCalculated = (
                monthly * calculatedPayments -
                userAmount
            ).toFixed(2);

            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: monthlyPaymentCalculated,
                totalPayment: totalPaymentCalculated,
                totalInterest: totalInterestCalculated,
            });
        }
        return;
    };


    return (
        <Container>
            <Wrapper>
                <h1>Loan Calculator</h1>
                <AllContainer>

                    <Form onSubmit={handleSubmitValues}>
                        <InputSection>
                            <label>Loan amount</label>
                            <Error>{error.amount}</Error>
                            <Span>
                                $
                            <input
                                    type='text'
                                    name='amount'
                                    value={userValues.amount}
                                    onChange={handleInputChange} />

                            </Span>
                        </InputSection>

                        <InputSection>
                            <label>Loan term in years</label>
                            <Error>{error.years}</Error>
                            <Input
                                type='text'
                                name='years'
                                value={userValues.years}
                                onChange={handleInputChange}
                            />

                        </InputSection>
                        <InputSection><label>Or</label></InputSection>

                        <InputSection>
                            <label>Loan term in months</label>
                            <Error>{error.months}</Error>
                            <Input
                                type='text'
                                name='months'
                                value={userValues.months}
                                onChange={handleInputChange}
                            />
                        </InputSection>

                        <InputSection>
                            <label>Interest rate per year</label>
                            <Error>{error.interest}</Error>
                            <Span>
                                <input
                                    type='text'
                                    name='interest'
                                    value={userValues.interest}
                                    onChange={handleInputChange}
                                />
                            %
                            </Span>
                        </InputSection>

                        <SubmitButton>Calculate</SubmitButton>
                    </Form>

                    <Result>
                        <p>Monthly Payments: </p>
                        <h1>${results.monthlyPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                        <p>Total Principal Paid: ${results.totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <Hr />
                        <p>Total Interest Paid: ${results.totalInterest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
                    </Result>

                </AllContainer>
            </Wrapper>
        </Container>
    )
}

export default LoanCalculator

