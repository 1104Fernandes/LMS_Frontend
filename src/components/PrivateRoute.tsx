import React, { useContext } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

const PrivateRoute: React.FC<{
  component: React.FC | React.FC<RouteComponentProps<any> | undefined>;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = useContext(userContext);

  return condition.user ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
