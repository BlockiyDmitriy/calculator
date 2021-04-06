import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import Row from './Row';
import './styles/Styles.css'

export const NumberContext = React.createContext();

const Calculator = () => {
    const [number, setNumber] = useState('');
    const [number2, setNumber2] = useState('');
    const [value, setValue] = useState('');
    const [functionType, setFunctionType] = useState('');

    const handlerSetNumberValue = () => {
        setNumber2(number);
        setNumber('')
    };
    const handlerNumber = (el) => {
        if (!number.includes('.') || el !== '.') {
            setNumber(`${(number + el).replace(/^0+/, '')}`);
        }
    }
    const handlerFunc = (el) => {
        if (number) {
            setFunctionType(el);
            handlerSetNumberValue();
        }
        if (number2) {
            setFunctionType(el);
        }
    }
    const handlerClear = () => {
        setNumber('');
        setNumber2('');
        setFunctionType('');
        setValue('');
    }
    const handlerEqual = () => {

        if (number && number2) {
            switch (functionType) {
                case '+':
                    setValue(`${parseFloat(number2) + parseFloat(number)}`)
                    break;

                case '-':
                    setValue(`${parseFloat(number2) - parseFloat(number)}`)
                    break;

                case '%':
                    setValue(`${parseFloat(number2) * 100 / parseFloat(number)}`)
                    break;
                    
                case '/':
                    setValue(`${parseFloat(number2) / parseFloat(number)}`)
                    break;

                case '*':
                    setValue(`${parseFloat(number2) * parseFloat(number)}`)
                    break;
            }
        }
    };
    const handlerNegativeFunc = () => {
        if (number) {
            if (number > 0) {
                setNumber(`-${number}`);
            } else {
                const num = number.slice(1);
                setNumber(num);
            }
        } else if (number2 > 0) {
            setNumber2(`-${number2}`);
        } else {
            const num = number2.slice(1);
            setNumber2(num);
        }
    };



    return (
        <div>
            <div>
                <Display value={value ? `${value}` : `${number2} ${functionType} ${number}`} />
            </div>
            <div className="buttons">
                <Row>
                    <Button buttonValue='C' buttonType='action-button' handler={handlerClear} />
                    <Button buttonValue='-/+' buttonType='action-button' handler={handlerNegativeFunc} />
                    <Button buttonValue='%' buttonType='action-button' handler={handlerFunc} />
                    <Button buttonValue='/' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={7} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={8} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={9} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='*' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={4} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={5} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={6} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='-' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={1} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={2} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue={3} buttonType='number-button' handler={handlerNumber} />
                    <Button buttonValue='+' buttonType='operation-button' handler={handlerFunc} />
                </Row>
                <Row>
                    <Button buttonValue={0} buttonType='wide-button number-button' handler={handlerNumber} />
                    <Button buttonValue='.' buttonType='action-button' handler={handlerNumber} />
                    <Button buttonValue='=' buttonType='equal-button' handler={handlerEqual} />
                </Row>
            </div>
        </div>
    )
}

export default Calculator;