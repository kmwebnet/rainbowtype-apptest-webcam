/*
MIT License
Copyright (c) 2020 kmwebnet
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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

function Routes() {
  const [open, setopen] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    setopen((open) => !open);
  }, []);

  const classes = useStyles();

  return (
    <Router basename="/app">
      <NavBar show={open} drawToggleClickHandler={handleToggle} />
      <div className={classes.appBarSpacer}>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.sub} render={() => <SubComponent />} />
          <Route path={routes.sub2} render={() => <SubComponent2 />} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
