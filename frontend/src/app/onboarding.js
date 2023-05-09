"use client"

import { isValidEmail, isValidNumber } from "./utils";
import { useEffect, useState } from "react";

import { BACKEND_BASE_URL } from "./constants";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import styles from "./onboarding.module.css";

const questions = [
    {
        text: "What is the name of your store?",
        type: "text",
        input_label: "Store name",
    },
    {
        text: "What is the balance left on your gift card?",
        type: "number",
        input_label: "Balance",
    },
    {
        text: "What price are you selling at?",
        type: "number",
        input_label: "Price",
    },
    {
        text: "Which network would you like to receive funds at?",
        type: "select",
        options: ["Polygon", "Ethereum"],
        input_label: "Network",
    },
    {
        text: "What address do you want to receive funds at?",
        type: "text",
        input_label: "Address",
    },
    {
        text: "What's your email address?",
        type: "email",
        input_label: "Email",
    },
]

export default function Onboarding() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(""))
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const LOCAL_STORAGE_ANSWERS_KEY = "answers";

    useEffect(() => {
        window.addEventListener("beforeunload", handlePageRefresh);
        return () => {
            window.removeEventListener("beforeunload", handlePageRefresh);
        };
    }, []);

    const handlePageRefresh = (e) => {
        const saved_answers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ANSWERS_KEY))
        if (saved_answers) {
            sendResult(saved_answers);
            localStorage.removeItem(LOCAL_STORAGE_ANSWERS_KEY);
        }

        e.preventDefault();
        e.returnValue = "";
    }

    const handleAnswerChange = (e) => {
        const newAnswers = answers.slice();
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);

        // saved to local storage to access it on the page refresh
        localStorage.setItem(LOCAL_STORAGE_ANSWERS_KEY, JSON.stringify(newAnswers));
    }

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            sendResult(answers);
            localStorage.removeItem(LOCAL_STORAGE_ANSWERS_KEY);
            setIsFinished(true);
        }
    }

    const sendResult = (answers) => {
        const result = {
            store_name: answers[0],
            gift_card_balance: answers[1],
            gift_card_price: answers[2],
            network: answers[3],
            wallet_address: answers[4],
            email_address: answers[5],
        }
        fetch(`${BACKEND_BASE_URL}/surveys/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const getCurrentQuestionInput = (currentQuestion) => {
        let input;
        const data = questions[currentQuestion];

        if (data.type === "text") {
            input = (
                <TextField
                    value={answers[currentQuestion]}
                    label={data.input_label}
                    type="text"
                    onChange={handleAnswerChange}
                />
            )
        }
        else if (data.type === "number") {
            input = (
                <TextField
                    value={answers[currentQuestion]}
                    label={data.input_label}
                    type="text"
                    error={!isValidNumber(answers[currentQuestion])}
                    helperText={
                        !isValidNumber(answers[currentQuestion]) ?
                            "Invalid number" :
                            ""
                    }
                    onChange={handleAnswerChange}
                    // onKeyPress={(event) => {
                    //     if (!isValidNumber(event.key)) {
                    //         event.preventDefault();
                    //     }
                    // }}
                />
            )
        }
        else if (data.type === "email") {
            input = (
                <TextField
                    value={answers[currentQuestion]}
                    label={data.input_label}
                    type="email"
                    error={!isValidEmail(answers[currentQuestion])}
                    helperText={
                        !isValidEmail(answers[currentQuestion]) ?
                            "Invalid email format" :
                            ""
                    }
                    onChange={handleAnswerChange}
                />
            )
        }
        else if (data.type === "select") {
            input = (
                <FormControl>
                    <InputLabel>{data.input_label}</InputLabel>
                    <Select
                        value={answers[currentQuestion]}
                        label={data.input_label}
                        onChange={handleAnswerChange}
                    >
                        {data.options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        }

        return input;
    }


    return (
        <div className={styles.onboarding}>

            <div className="onboarding-title">
                <h2>Seller Onboarding Form</h2>
            </div>

            {isFinished ?
                (
                    <div>
                        Thank you for your submission!
                        (Results can be seen <Link href="/results">here</Link>)
                    </div>
                )
                : (
                    <div className="onboarding-form">
                        <div className={styles["onboarding-question"]}>
                            <h4 className={styles['onboarding-question-title']}>
                                {questions[currentQuestion].text}
                            </h4>
                            <div className={styles["onboarding-question-input"]}>
                                {getCurrentQuestionInput(currentQuestion)}
                            </div>
                        </div>

                        <div className="onboarding-navigation">
                            <Button
                                className={styles["onboarding-back-button"]}
                                variant="contained"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion == 0}
                            >
                                Back
                            </Button>

                            <Button
                                className={styles["onboarding-next-button"]}
                                variant="contained"
                                onClick={handleNextQuestion}
                            >
                                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
