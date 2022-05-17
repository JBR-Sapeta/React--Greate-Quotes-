import { Fragment } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getSingleQuote } from "../../Lib/Api";
import { useEffect } from "react";

import useHttp from "../../Hooks/useHttp";

import Page from "../../Components/Ui/Wrapers/Page";
import CustomButton from "../../Components/Ui/Actions/CustomButton";
import QuoteDetails from "../../Components/Quotes/Details/QuoteDetails";
import LoadingSpinner from "../../Components/Ui/LoadingSpinner";
import ErrorMessage from "../../Components/Ui/ErrorMessage";
import QuoteNotFound from "../../Components/Quotes/NotFoundMessage";



const SingleQuote = () => {
  const params = useParams();
  const location = useLocation();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: singleQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const commentsLoaded = location.pathname.includes("comments");

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (status === "completed" && !singleQuote) {
    return <QuoteNotFound />;
  }
  
  
  return (
    <Page>
      <QuoteDetails nick={singleQuote.nick} userId={singleQuote.userId} author={singleQuote.author} text={singleQuote.text} />

      {!commentsLoaded && (
        <CustomButton color="primary" to={`comments`}>
          Check users comments.
        </CustomButton>
      )}

      <Outlet />
    </Page>
  );
};

export default SingleQuote;
