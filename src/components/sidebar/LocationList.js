import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import DataBox from "../data-box/DataBox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const renderRow = (props) => (tableProps) => {
  // console.log('{props, tableProps}', {props, tableProps});
  const { classes, maintenances, isTechnicalRange } = props;
  const { index, style } = tableProps;
  const {
    id,
    orders,
    mainStreet,
    secondStreet,
    corrective,
    preventive,
    equipments,
    materials,
    services,
    intersectionID,
    engineering,
  } = maintenances[index];

  return (
    <ListItem dense divider button style={style} key={id}>
      <Grid container spacing={2}>
        <Grid item container md={isTechnicalRange ? 6 : 4}>
          <ListItemText
            primary={
              <>
                <Typography align="left" variant="caption">
                  {intersectionID}
                </Typography>
                <Typography align="left" variant="body2">
                  {mainStreet}
                </Typography>
              </>
            }
            secondary={secondStreet}
          />
        </Grid>
        {isTechnicalRange && (
          <Grid item container md={6} alignItems="center">
            <Typography variant={"body2"}>Órdenes: {orders || 0}</Typography>
          </Grid>
        )}
        {!isTechnicalRange && (
          <ActivityTypes
            {...{
              classes,
              corrective,
              engineering,
              preventive,
              equipments,
              materials,
              services,
            }}
          />
        )}
      </Grid>
    </ListItem>
  );
};

function ActivityTypes({
  classes,
  corrective,
  engineering,
  preventive,
  equipments,
  materials,
  services,
}) {
  return (
    <>
      <Grid
        item
        md={4}
        container
        justify="center"
        className={classes.leftBox}
        direction="column"
      >
        <DataBox
          small
          currency
          shortLabel
          text="C"
          style={{
            color: classes.corrective,
          }}
          number={corrective}
        />

        <DataBox
          small
          currency
          shortLabel
          text="I"
          style={{
            color: classes.engineering,
          }}
          number={engineering}
        />
        <DataBox
          small
          currency
          shortLabel
          text="P"
          style={{
            color: classes.preventive,
          }}
          number={preventive}
        />
      </Grid>
      <Grid item md={4} justify="center" container direction="column">
        <DataBox
          small
          currency
          shortLabel
          text="E"
          style={{
            color: classes.equipment,
          }}
          number={equipments}
        />
        <DataBox
          small
          currency
          shortLabel
          text="M"
          style={{
            color: classes.materials,
          }}
          number={materials}
        />
        <DataBox
          small
          currency
          shortLabel
          text="S"
          style={{
            color: classes.services,
          }}
          number={services}
        />
      </Grid>
    </>
  );
}

export default function LocationsList({ classes, maintenances, ...props }) {
  return (
    <div className={classes.list}>
      <FixedSizeList
        height={1600}
        width={"100%"}
        itemSize={100}
        itemCount={maintenances.length}
      >
        {renderRow({ classes, maintenances, ...props })}
      </FixedSizeList>
    </div>
  );
}
