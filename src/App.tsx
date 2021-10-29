import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { AnswerPage } from "./pages/AnswerPage";
import { AnswerProvider } from "./contexts/AnswerContext";
import { QuestionProvider } from "./contexts/QuestionContext";
import { QuestionPage } from "./pages/QuestionPage";
import { CategoryProvider } from "./contexts/CategoryContext";
import { AnswersByQuestion } from "./pages/AnswersByQuestion";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { LearningPage } from "./pages/LearningPage";
import { UserProvider } from "./contexts/UserContext";
import { CategoryPage } from "./pages/CategoryPage";
import { SelectionPage } from "./pages/SelectionPage";
import { StatisticPage } from "./pages/StatisticPage";
import { ProfessionProvider } from "./contexts/ProfessionContext";
import { JobProvider } from "./contexts/JobRoleContext";
import { SelfPage } from "./pages/SelfPage";
import { EntryTestPage } from "./pages/EntryTestPage";
import { LearningEntryPage } from "./pages/LearningEntryPage";
import { InterviewedPage } from "./pages/InterviewedPage";
import { FinishTestPage } from "./pages/FinishTestPage";
import { UmfrageOnline } from "./pages/OnlineUmfragePage";

export const App: React.FC = () => {
  return (
    //<React.StrictMode>
    <Router>
      <UserProvider>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <QuestionProvider>
          <CategoryProvider>
            <PrivateRoute path="/fragen" component={QuestionPage} exact />
            <PrivateRoute path="/kategorien" component={CategoryPage} exact />
            <PrivateRoute path="/themen" component={SelectionPage} exact />
            <JobProvider>
              <ProfessionProvider>
                <Route path="/registrieren" component={Signup} />
              </ProfessionProvider>
            </JobProvider>
            <PrivateRoute path="/selbsttest/:id" component={SelfPage} exact />
            <PrivateRoute
              path="/eingangstest/:id"
              component={EntryTestPage}
              exact
            />
          </CategoryProvider>
        </QuestionProvider>
        <AnswerProvider>
          <PrivateRoute path="/antworten" component={AnswerPage} exact />
          <PrivateRoute path="/statistik" component={StatisticPage} exact />
          <PrivateRoute
            path="/antworten/:id"
            component={AnswersByQuestion}
            exact
          />
        </AnswerProvider>
        <PrivateRoute path="/fragender/:id" component={LearningPage} exact />
        <PrivateRoute path="/befragter/:id" component={InterviewedPage} exact />
        <Route path="/login" component={Signin} />
        <Route path="/OnlineUmfrage" component={UmfrageOnline} />
        <PrivateRoute path="/lernmethode/:id" component={LearningEntryPage} exact />
        <PrivateRoute path="/abschlusstest" component={FinishTestPage} exact />
      </UserProvider>
    </Router>
    // </React.StrictMode>
  );
};

export default App;
