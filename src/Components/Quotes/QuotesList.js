import { Fragment, useState } from "react";
import { Pagination } from "antd";

import QuoteItem from "./QuoteItem";
import MyQuote from "./MyQuote";

import styles from "./QuotesList.module.scss";
import "../../Styles/Pagination.css";

const QuoteList = ({ quotes, editMode = false }) => {
  let content;
  const totalQuotes = quotes.length;
  const [page, setPage] = useState(1);
  const [quotesPerPage] = useState(6);

  const indexOfLastQuote = page * quotesPerPage ;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage ;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);

  const changePageHandler = (value) => {
    setPage(value);
  };

  if (editMode) {
    content = currentQuotes.map((quote) => (
      <MyQuote
        key={quote.id}
        id={quote.id}
        userId={quote.userId}
        nick={quote.nick}
        author={quote.author}
        text={quote.text}
      />
    ));
  } else {
    content = currentQuotes.map((quote) => (
      <QuoteItem
        key={quote.id}
        id={quote.id}
        userId={quote.userId}
        nick={quote.nick}
        author={quote.author}
        text={quote.text}
      />
    ));
  }

  return (
    <Fragment>
      {quotes.length && (
        <Pagination
          onChange={changePageHandler}
          pageSize={quotesPerPage}
          total={totalQuotes}
          current={page}
        />
      )}

      <ul className={styles.list}>{content}</ul>

      {quotes.length && (
        <Pagination
          onChange={changePageHandler}
          pageSize={quotesPerPage}
          total={totalQuotes}
          current={page}
        />
      )}
    </Fragment>
  );
};

export default QuoteList;
