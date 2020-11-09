/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import routes from '../constants/routes.json';
import NavBar from './NavBar';
import Home from './components/Home';
import SubComponent from './components/sub-component';
import SubComponent2 from './components/sub-component2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
  })
);


function Routes () {
  const [open, setopen] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    setopen(open => !open);
  }, []);

  const classes = useStyles();

    return (
      <Router basename='/app'>

      <NavBar show={open} drawToggleClickHandler={handleToggle}
      />
        <div className={classes.appBarSpacer}>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.sub} render={ () => <SubComponent/> } />
          <Route path={routes.sub2} render={ () => <SubComponent2/> } />
        </Switch>
        </div>
      </Router>
    );

};

export default Routes;
