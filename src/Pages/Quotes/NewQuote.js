import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import useHttp from "../../Hooks/useHttp";
import { addQuote } from "../../Lib/Api";

import SuccesMessage from "../../Components/Ui/SuccesMessage";
import QuoteForm from "../../Components/Quotes/Form/QuoteForm";
import ErrorMessage from "../../Components/Ui/ErrorMessage";
import Page from "../../Components/Ui/Wrapers/Page";
import Card from "../../Components/Ui/Wrapers/Card";

import styles from "./NewQuote.module.scss"

const NewQuote = () => {
  const { sendRequest, status,data,error } = useHttp(addQuote);
  const {nick,userId} = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const addQuoteHandler = (quoteData) => {
    const transformedData = {...quoteData,nick:nick,userId:userId}
    sendRequest(transformedData);
  };
  
  useEffect(()=>{
    if(!nick){
      navigate("/start");
    }
  },[navigate,nick])
 

  return (
    <Page>
    <div className={styles.container}>
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
    
    {error&&(<Card fit={true}><ErrorMessage message={error}/></Card>)}
    {data&&(<Card fit={true}><SuccesMessage/></Card>)}
    </div>
    </Page>
  );
};

export default NewQuote;


