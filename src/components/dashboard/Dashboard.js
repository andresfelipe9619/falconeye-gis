import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EconomicReport from "../economic-report/EconomicReport";
import TecnicReport from "../tecnic-report/TecnicReport";
import NewTecnicReport from "../tecnic-report/NewTecnicReport";
import NewEconomicReport from "../economic-report/NewEconomicReport";
import {
  getDsLayers,
  getEconomicReport,
  getTechnicalReport,
  getEconomicDeatilReport,
  getTechnicalDeatilReport,
} from "../../api";

export default function Dashboard() {
  const [dsLayers, setDsLayers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const layers = await getDsLayers();
        setDsLayers(layers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!dsLayers.length) return null;
  return (
    <Switch>
      {dsLayers.map((layer, i) => {
        if (!layer.state) return null;
        return (
          <Route
            exact
            strict
            key={i}
            path={`/dashboard/${layer.property.toLowerCase()}`}
            render={mapper[layer.property]}
          />
        );
      })}
      <Redirect to={`/dashboard/${(dsLayers[0] || {}).property || ""}`} />
    </Switch>
  );
}

const mapper = {
  Technical: (props) => (
    <NewTecnicReport getData={getTechnicalDeatilReport} {...props} />
  ),
  Economic: (props) => (
    <NewEconomicReport getData={getEconomicDeatilReport} {...props} />
  ),
  Technical_v0: (props) => (
    <TecnicReport getData={getTechnicalReport} {...props} />
  ),
  Economic_v0: (props) => (
    <EconomicReport getData={getEconomicReport} {...props} />
  ),
};
