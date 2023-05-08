"use client"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from "./onboarding.module.css";
import { useState } from 'react';

const questions = [
    {
        text: "What is the name of your store?",
        type: "text",
        input_label: "Store name",
        input_type: "text"
    },
    {
        text: "What is the balance left on your gift card?",
        type: "text",
        input_label: "Balance",
        input_type: "text",
    },
    {
        text: "What price are you selling at?",
        type: "text",
        input_label: "Price",
        input_type: "text",
    },
    {
        text: "Which network would you like to receive funds at?",
        type: "text",
        options: ["Polygon", "Ethereum"],
        input_label: "Network",
        input_type: "text",
    },
    {
        text: "What address do you want to receive funds at?",
        type: "text",
        input_label: "Address",
        input_type: "text",
    },
    {
        text: "What's your email address?",
        type: "text",
        input_label: "Email",
        input_type: "text"
    },
]

export default function Onboarding() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(""))
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswerChange = (e) => {
        const newAnswers = answers.slice();
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);
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
            sendResult();
            setIsFinished(true);
        }
    }

    const sendResult = () => {
        const result = {
            store_name: answers[0],
            gift_card_balance: answers[1],
            gift_card_price: answers[2],
            network: answers[3],
            wallet_address: answers[4],
            email_address: answers[5],
        }
        fetch('http://0.0.0.0:8000/surveys', {
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
                    type={data.input_type}
                    onChange={handleAnswerChange}
                />
            )
        }

        return input;
    }


    return (
        <div className={styles.onboarding}>

            <div className="onboarding-title">
                <h2>Seller Onboarding Form</h2>
            </div>

            { isFinished ?
                (
                    <div> Thank you for your submission!</div>
                )
                : (
                    <div className="onboarding-form">
                        <div className={styles["onboarding-question"]}>
                            <h4 className={styles['onboarding-question-title']}>
                                {questions[currentQuestion].text}
                            </h4>
                            {getCurrentQuestionInput(currentQuestion)}
                        </div>

                        <div className="onboarding-navigation">
                            <Button
                                className={styles["onboarding-back-button"]}
                                variant="contained"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion == 0 }
                            >
                                Back
                            </Button>

                            <Button
                                className={styles["onboarding-next-button"]}
                                variant="contained"
                                onClick={handleNextQuestion}
                            >
                                { currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
