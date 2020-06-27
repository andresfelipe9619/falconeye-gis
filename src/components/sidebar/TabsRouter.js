import React, { memo } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

function TabsRouter(props) {
  const { tabs, variant, onChange } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Route>
          {({ location, match }) => {
            const currentLocation = location.pathname;

            const tabRoute = (route) => route && `${match.url}${route}`;
            return (
              <div className={classes.root}>
                <Tabs
                  value={currentLocation}
                  indicatorColor="primary"
                  textColor="primary"
                  centered={!variant}
                  onChange={onChange}
                  variant={variant}
                  scrollButtons="on"
                >
                  {tabs.map(({ label, to }, index) => (
                    <Tab
                      key={label}
                      label={label}
                      tabIndex={index}
                      component={Link}
                      to={tabRoute(to)}
                      value={tabRoute(to)}
                      className={classes.tabButton}
                    />
                  ))}
                </Tabs>
                <Divider variant="middle" />
                <Switch>
                  {tabs.map(({ render, to }, i) => (
                    <Route key={i} render={render} path={tabRoute(to)} />
                  ))}
                  <Redirect to={tabRoute(tabs[0].to)} />;
                </Switch>
              </div>
            );
          }}
        </Route>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  shadowTabs: {
    boxShadow: "none",
  },
  tabButton: {
    "&:focus": {
      outline: "none",
    },
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "120px",
  },
}));
export default memo(TabsRouter);
