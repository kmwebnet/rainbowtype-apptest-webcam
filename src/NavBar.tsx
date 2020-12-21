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
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { AppBar, MenuItem, Drawer, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

interface ISideDrawerWrapperProps {
  show: boolean;
}

interface IProps extends ISideDrawerWrapperProps {
  drawToggleClickHandler(): void;
}

function NavBar(props: IProps) {
  const clickHandler = () => {
    props.drawToggleClickHandler();
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          open={props.show}
          onClose={() => clickHandler()}>
          <MenuItem onClick={() => clickHandler()}>
            <Link to={routes.HOME}>HOME</Link>
          </MenuItem>
          <MenuItem onClick={() => clickHandler()}>
            <Link to={routes.sub}>sub</Link>
          </MenuItem>
          <MenuItem onClick={() => clickHandler()}>
            <Link to={routes.sub2}>sub2</Link>
          </MenuItem>
        </Drawer>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => clickHandler()}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default NavBar;
