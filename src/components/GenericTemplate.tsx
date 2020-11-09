/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

interface Props {
  children: React.ReactNode;
}

const GenericTemplate: React.FC<Props> = props => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <>
                {props.children}
            </>
          </Container>
        </main>
      </div>
  );
};

export default GenericTemplate;