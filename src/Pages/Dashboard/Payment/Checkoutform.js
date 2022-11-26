import React, { useEffect, useState } from 'react';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"

const CheckoutForm = ({booking}) => {
    const [cardError, setCardError] = useState("")
    const [success, setSuccess] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const stripe = useStripe()
    const elements = useElements()
    const { price, email, patient, _id } = booking
    

    useEffect(() => {
        fetch(" https://assignment-12-server-side.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({price})
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })
        
    }, [price])

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return 
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message)
        } else {
            setCardError("")
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    email: email,
                    name: patient
                },
              },
            },
        );
        
        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess("Congrates! Your Payment Complete")
            setTransactionId(paymentIntent.id)
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch(" https://assignment-12-server-side.vercel.app/payments", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess("Congrates! Your Payment Complete")
                        setTransactionId(paymentIntent.id)
                    }
                    
            })
        }
        
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
                </button>
            </form>
            <p className='text-red-800'>{cardError}</p>
            {
                success && <>
                    <p>{success}</p>
                    <p>Your Transaction id is {transactionId}</p>
                </>
            }
        </>
    );
};

export default CheckoutForm;