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
  }),
);




interface ISideDrawerWrapperProps {
  show: boolean;
}

interface IProps extends ISideDrawerWrapperProps {
  drawToggleClickHandler(): void;
}


function NavBar (props: IProps) {

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
            <MenuItem onClick={() => clickHandler()} >
            <Link to={routes.HOME}>HOME</Link>
            </MenuItem>
            <MenuItem onClick={() => clickHandler()} >
            <Link to={routes.sub}>sub</Link>
            </MenuItem>
            <MenuItem onClick={() => clickHandler()} >
            <Link to={routes.sub2}>sub2</Link>
            </MenuItem>
          </Drawer>
          <AppBar 
          position="fixed"
          >
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => clickHandler()}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );

}

export default NavBar;
