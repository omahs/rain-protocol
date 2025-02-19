import { Rainterpreter, RainterpreterStore } from "../../../../../typechain";
import { basicDeploy } from "../../../basicDeploy";

export const rainterpreterDeploy = async () => {
  const store = (await basicDeploy(
    "RainterpreterStore",
    {}
  )) as RainterpreterStore;
  return (await basicDeploy("Rainterpreter", {}, [
    store.address,
  ])) as Rainterpreter;
};
