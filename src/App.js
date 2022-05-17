import React,{Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


import LoadingSpinner from "./Components/Ui/LoadingSpinner";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import Qoutes from "./Pages/Quotes/Quotes";
import SingleQuote from "./Pages/Quotes/SingleQuote";
import Comments from "./Components/Coments/Comments";
import AuthPage from "./Pages/Auth/AuthPage";
import PageNotFound from "./Pages/PageNotFound";

import "./Styles/global.scss";


const NewQuote = React.lazy(()=>import("./Pages/Quotes/NewQuote"));
const MyQuotes = React.lazy(()=>import("./Pages/Quotes/MyQuotes"));
const StartingPage = React.lazy(()=>import("./Pages/Auth/StartingPage"));
const ProfilePage = React.lazy(()=>import("./Pages/Auth/ProfilePage"));
const User = React.lazy(()=>import("./Pages/User"));

function App() {
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn } = authState;

  return (
    <Layout>
      <Suspense fallback={<div className="centered">
        <LoadingSpinner/>
      </div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotes" element={<Qoutes />} />
        <Route path="/quotes/:quoteId" element={<SingleQuote />}>
          <Route path="/quotes/:quoteId/comments" element={<Comments />} />
        </Route>
        {isLoggedIn && <Route path="/add-quote" element={<NewQuote />} />}
        {isLoggedIn && <Route path="/my-quotes" element={<MyQuotes />} />}
        {isLoggedIn && <Route path="/start" element={<StartingPage />} />}
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        {isLoggedIn && <Route path="/user/:userId" element={<User />} />}
        <Route path="/authentication" element={<AuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
