import { useEffect } from "react";
import { useSelector } from "react-redux";

import useHttp from "../../Hooks/useHttp";
import { getAllQuotes } from "../../Lib/Api";

import Page from "../../Components/Ui/Wrapers/Page";
import Card from "../../Components/Ui/Wrapers/Card";
import QuoteList from "../../Components/Quotes/QuotesList";
import LoadingSpinner from "../../Components/Ui/LoadingSpinner";
import ErrorMessage from "../../Components/Ui/ErrorMessage";
import CutomButton from "../../Components/Ui/Actions/CustomButton";
import NotFoundMessage from "../../Components/Quotes/NotFoundMessage";

import styles from "./MyQuotes.module.scss";

const MyQuotes = () => {
  const { userId } = useSelector((state) => state.auth);
  
  const {
    sendRequest,
    status,
    data: allQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const loadQuotes = () => {
    sendRequest();
  };

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
        <Card>
          <ErrorMessage message={error} />
        </Card>
      </div>
    );
  }

  if (status === "completed" && (!allQuotes || allQuotes.length === 0)) {
    return <NotFoundMessage />;
  }

  const filteredQuotes = allQuotes.filter((quote) => {
    return quote.userId === userId;
  });

 

  const quotesExist = Boolean(filteredQuotes.length);

  return (
    <Page>
      {!quotesExist && <NotFoundMessage author={false} />}
      {quotesExist && (
        <div className={styles.quotes}>
          <div className={styles.div}>
           
            <CutomButton color="primary" onClick={loadQuotes}>
              Refresh
            </CutomButton>
          </div>

          <QuoteList editMode={true} quotes={filteredQuotes} />
        </div>
      )}
    </Page>
  );
};

export default MyQuotes;
