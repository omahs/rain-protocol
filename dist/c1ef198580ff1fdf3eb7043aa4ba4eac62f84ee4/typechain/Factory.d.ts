/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface FactoryInterface extends ethers.utils.Interface {
  functions: {
    "createChild(bytes)": FunctionFragment;
    "isChild(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createChild",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "isChild", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "createChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isChild", data: BytesLike): Result;

  events: {
    "NewContract(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewContract"): EventFragment;
}

export class Factory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: FactoryInterface;

  functions: {
    createChild(
      data_: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createChild(bytes)"(
      data_: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isChild(
      maybeChild_: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "isChild(address)"(
      maybeChild_: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  createChild(
    data_: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createChild(bytes)"(
    data_: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isChild(
    maybeChild_: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "isChild(address)"(
    maybeChild_: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    createChild(data_: BytesLike, overrides?: CallOverrides): Promise<string>;

    "createChild(bytes)"(
      data_: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    isChild(maybeChild_: string, overrides?: CallOverrides): Promise<boolean>;

    "isChild(address)"(
      maybeChild_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    NewContract(_contract: string | null): EventFilter;
  };

  estimateGas: {
    createChild(data_: BytesLike, overrides?: Overrides): Promise<BigNumber>;

    "createChild(bytes)"(
      data_: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isChild(maybeChild_: string, overrides?: Overrides): Promise<BigNumber>;

    "isChild(address)"(
      maybeChild_: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createChild(
      data_: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createChild(bytes)"(
      data_: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isChild(
      maybeChild_: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "isChild(address)"(
      maybeChild_: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
