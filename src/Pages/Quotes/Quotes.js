import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getAllQuotes } from "../../Lib/Api";
import useHttp from "../../Hooks/useHttp";

import Page from "../../Components/Ui/Wrapers/Page";
import Card from "../../Components/Ui/Wrapers/Card";
import LoadingSpinner from "../../Components/Ui/LoadingSpinner";
import ErrorMessage from "../../Components/Ui/ErrorMessage";
import NotFoundMessage from "../../Components/Quotes/NotFoundMessage";
import QuoteList from "../../Components/Quotes/QuotesList";
import QuoteFilter from "../../Components/Quotes/QuoteFilter";

import styles from "./Quotes.module.scss";

const Qoutes = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const {
    sendRequest,
    status,
    data: allQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
        <Card><ErrorMessage message={error} /></Card>
      </div>
    );
  }

  if (status === "completed" && (!allQuotes || allQuotes.length === 0)) {
    return <NotFoundMessage />;
  }

  const addFilteredAuthor = (enteredAuthor) => {
    if (enteredAuthor) {
      setQueryParams({ enteredAuthor });
    } else {
      setQueryParams({});
    }
  };

  const author = queryParams.get("enteredAuthor") || "";

  const filteredQuotes = allQuotes.filter((quote) => {
    return quote.author.toLowerCase().includes(author.toLowerCase());
  });

  const quotesExist = Boolean(filteredQuotes.length);

  return (
    <Page>
      <QuoteFilter onAddQuery={addFilteredAuthor} />
      {!quotesExist && <NotFoundMessage author={true} />}
      {quotesExist && (
        <div className={styles.quotes}>
          <QuoteList quotes={filteredQuotes} />
        </div>
      )}
    </Page>
  );
};

export default Qoutes;
