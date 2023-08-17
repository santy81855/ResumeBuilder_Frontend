import React, { useEffect, useState } from "react";
import "../styles/AccountPage.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user/UserRequests";
import { getSubscription } from "../api/subscription/SubscriptionRequests";
import { getAllUserResumes } from "../api/resume/ResumeRequests";
import {
    cancelSubscription,
    createCheckoutSession,
    renewSubscription,
} from "../api/stripe/StripeRequests";
import SubscriptionModal from "./SubscriptionModal";
import CreateResumeModal from "./CreateResumeModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import { useTranslation, Trans } from "react-i18next";

const AccountPage = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [isCancelled, setIsCancelled] = useState(null); // ["active", "canceled"
    const [cancel, setCancel] = useState(null);
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [resumes, setResumes] = useState(null);
    useEffect(() => {
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
            if (data.length > 0) {
                setSubscription(data[0]);
                setIsCancelled(data[0].subscription.cancel_at_period_end);
                setDate(
                    new Date(data[0].subscription.current_period_end * 1000)
                );
            }
        },
        onError: (error, variables, context) => {},
    });

    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {
            setResumes(data);
        },
        onError: (error, variables, context) => {},
    });

    const cancelSubscriptionHandler = async () => {
        await cancelSubscription(getUserQuery.data?.user);
        toast.success(
            "Subscription set to be cancelled at the end of the billing period.",
            {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        setCancel(true);
    };

    const renewSubscriptionHandler = async () => {
        await renewSubscription(getUserQuery.data?.user);
        toast.success(
            "Subscription will be renewed at the end of the current billing cycle.",
            {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        setCancel(false);
    };

    const handleUpgradeButtonClick = () => {
        setSubscriptionModal(true);
    };

    return (
        <main className="main">
            <div className="account-container">
                <div className="account">
                    <h2>{t("account.title")}</h2>
                    <div>
                        <h4>{t("account.type")}</h4>
                        <p>
                            {subscription === null
                                ? t("account.free")
                                : t("account.pro")}
                        </p>
                    </div>
                    {!!subscription && isCancelled === false && date && (
                        <>
                            <div>
                                <h4>{t("account.renewal")}</h4>
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
                                onClick={cancelSubscriptionHandler}
                            >
                                {t("account.cancelSubscription")}
                            </button>
                        </>
                    )}
                    {!!subscription && isCancelled === true && date && (
                        <>
                            <div>
                                <h4>{t("account.ends")}</h4>
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
                                className="renew-button"
                                onClick={renewSubscriptionHandler}
                            >
                                {t("account.renewSubscription")}
                            </button>
                        </>
                    )}
                    {subscription === null && (
                        <button
                            className="upgrade-button"
                            onClick={handleUpgradeButtonClick}
                        >
                            {t("account.upgrade")}
                        </button>
                    )}
                </div>
            </div>
            <CreateResumeModal
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
            <SubscriptionModal
                subscriptionModal={subscriptionModal}
                setSubscriptionModal={setSubscriptionModal}
                user={getUserQuery.data?.user}
                createCheckoutSession={createCheckoutSession}
                setCreateModal={setCreateModal}
                resumes={resumes}
            />
            <ToastContainer />
            <Footer />
        </main>
    );
};

export default AccountPage;
