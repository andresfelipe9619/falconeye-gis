import { makeStyles } from "@material-ui/core/styles";

const useColors = makeStyles({
  preventive: { color: (props) => props.preventive },
  services: { color: (props) => props.services },
  engineering: { color: (props) => props.engineering },
  equipment: { color: (props) => props.equipment },
  materials: { color: (props) => props.materials },
  corrective: { color: (props) => props.corrective },
});
export default useColors;
