import React, { useEffect, useState } from "react";
import "../styles/AccountPage.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user/UserRequests";
import { getSubscription } from "../api/subscription/SubscriptionRequests";
import {
    cancelSubscription,
    createCheckoutSession,
} from "../api/stripe/StripeRequests";
import SubscriptionModal from "./SubscriptionModal";

const AccountPage = () => {
    const [date, setDate] = useState(null);
    const [cancel, setCancel] = useState(null);
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    useEffect(() => {
        console.log(subscriptionQuery.data);
        getUserQuery.refetch();
        subscriptionQuery.refetch();
    }, [cancel]);

    const getUserQuery = useQuery({
        queryKey: ["getUserByToken"],
        queryFn: getUser,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {},
    });

    const subscriptionQuery = useQuery({
        queryKey: ["getSubscription"],
        queryFn: getSubscription,
        onSuccess: (data, variables, context) => {
            if (data.length > 0)
                setDate(
                    new Date(data[0].subscription.current_period_end * 1000)
                );
        },
        onError: (error, variables, context) => {},
    });

    return (
        <main className="main">
            <div className="account-container">
                <div className="account">
                    <h2>Subscription Details</h2>
                    <div>
                        <h4>Subscription Type: </h4>
                        <p>
                            {subscriptionQuery.data?.length < 1
                                ? "Free"
                                : "Pro"}
                        </p>
                    </div>

                    {subscriptionQuery.data?.length === 1 && date && (
                        <>
                            <div>
                                <h4>Subscription Renews</h4>
                                <p>
                                    {date.toLocaleString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    cancelSubscription(getUserQuery.data?.user);
                                    setCancel(true);
                                }}
                            >
                                Cancel Subscription
                            </button>
                        </>
                    )}
                    {subscriptionQuery.data?.length === 0 && (
                        <button
                            className="upgrade-button"
                            onClick={() => {
                                setSubscriptionModal(true);
                            }}
                        >
                            Upgrade to pro
                        </button>
                    )}
                </div>
            </div>
            <SubscriptionModal
                subscriptionModal={subscriptionModal}
                setSubscriptionModal={setSubscriptionModal}
                user={getUserQuery.data?.user}
                createCheckoutSession={createCheckoutSession}
            />
        </main>
    );
};

export default AccountPage;
