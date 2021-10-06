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

interface PhasedTestInterface extends ethers.utils.Interface {
  functions: {
    "UNINITIALIZED()": FunctionFragment;
    "blockNumberForPhase(uint32[8],uint8)": FunctionFragment;
    "currentPhase()": FunctionFragment;
    "hookCondition()": FunctionFragment;
    "phaseAtBlockNumber(uint32[8],uint32)": FunctionFragment;
    "phaseBlocks(uint256)": FunctionFragment;
    "runsOnlyAtLeastPhase(uint8)": FunctionFragment;
    "runsOnlyPhase(uint8)": FunctionFragment;
    "testScheduleNextPhase(uint32)": FunctionFragment;
    "toggleHookCondition()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "UNINITIALIZED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "blockNumberForPhase",
    values: [
      [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "currentPhase",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hookCondition",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "phaseAtBlockNumber",
    values: [
      [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "phaseBlocks",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "runsOnlyAtLeastPhase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "runsOnlyPhase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "testScheduleNextPhase",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toggleHookCondition",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "UNINITIALIZED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "blockNumberForPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hookCondition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "phaseAtBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "phaseBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "runsOnlyAtLeastPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "runsOnlyPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testScheduleNextPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toggleHookCondition",
    data: BytesLike
  ): Result;

  events: {
    "PhaseShiftScheduled(uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PhaseShiftScheduled"): EventFragment;
}

export class PhasedTest extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: PhasedTestInterface;

  functions: {
    UNINITIALIZED(overrides?: CallOverrides): Promise<[number]>;

    "UNINITIALIZED()"(overrides?: CallOverrides): Promise<[number]>;

    blockNumberForPhase(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "blockNumberForPhase(uint32[8],uint8)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    currentPhase(overrides?: CallOverrides): Promise<[number]>;

    "currentPhase()"(overrides?: CallOverrides): Promise<[number]>;

    hookCondition(overrides?: CallOverrides): Promise<[boolean]>;

    "hookCondition()"(overrides?: CallOverrides): Promise<[boolean]>;

    phaseAtBlockNumber(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "phaseAtBlockNumber(uint32[8],uint32)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    phaseBlocks(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "phaseBlocks(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number]>;

    runsOnlyAtLeastPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "runsOnlyAtLeastPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    runsOnlyPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "runsOnlyPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    testScheduleNextPhase(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "testScheduleNextPhase(uint32)"(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    toggleHookCondition(overrides?: Overrides): Promise<ContractTransaction>;

    "toggleHookCondition()"(
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  UNINITIALIZED(overrides?: CallOverrides): Promise<number>;

  "UNINITIALIZED()"(overrides?: CallOverrides): Promise<number>;

  blockNumberForPhase(
    phaseBlocks_: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  "blockNumberForPhase(uint32[8],uint8)"(
    phaseBlocks_: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  currentPhase(overrides?: CallOverrides): Promise<number>;

  "currentPhase()"(overrides?: CallOverrides): Promise<number>;

  hookCondition(overrides?: CallOverrides): Promise<boolean>;

  "hookCondition()"(overrides?: CallOverrides): Promise<boolean>;

  phaseAtBlockNumber(
    phaseBlocks_: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    blockNumber_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  "phaseAtBlockNumber(uint32[8],uint32)"(
    phaseBlocks_: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    blockNumber_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  phaseBlocks(arg0: BigNumberish, overrides?: CallOverrides): Promise<number>;

  "phaseBlocks(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  runsOnlyAtLeastPhase(
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "runsOnlyAtLeastPhase(uint8)"(
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  runsOnlyPhase(
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "runsOnlyPhase(uint8)"(
    phase_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  testScheduleNextPhase(
    nextPhaseBlock_: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "testScheduleNextPhase(uint32)"(
    nextPhaseBlock_: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  toggleHookCondition(overrides?: Overrides): Promise<ContractTransaction>;

  "toggleHookCondition()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    UNINITIALIZED(overrides?: CallOverrides): Promise<number>;

    "UNINITIALIZED()"(overrides?: CallOverrides): Promise<number>;

    blockNumberForPhase(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    "blockNumberForPhase(uint32[8],uint8)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    currentPhase(overrides?: CallOverrides): Promise<number>;

    "currentPhase()"(overrides?: CallOverrides): Promise<number>;

    hookCondition(overrides?: CallOverrides): Promise<boolean>;

    "hookCondition()"(overrides?: CallOverrides): Promise<boolean>;

    phaseAtBlockNumber(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    "phaseAtBlockNumber(uint32[8],uint32)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    phaseBlocks(arg0: BigNumberish, overrides?: CallOverrides): Promise<number>;

    "phaseBlocks(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    runsOnlyAtLeastPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "runsOnlyAtLeastPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    runsOnlyPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "runsOnlyPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    testScheduleNextPhase(
      nextPhaseBlock_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "testScheduleNextPhase(uint32)"(
      nextPhaseBlock_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    toggleHookCondition(overrides?: CallOverrides): Promise<void>;

    "toggleHookCondition()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    PhaseShiftScheduled(newPhaseBlock_: BigNumberish | null): EventFilter;
  };

  estimateGas: {
    UNINITIALIZED(overrides?: CallOverrides): Promise<BigNumber>;

    "UNINITIALIZED()"(overrides?: CallOverrides): Promise<BigNumber>;

    blockNumberForPhase(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "blockNumberForPhase(uint32[8],uint8)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentPhase(overrides?: CallOverrides): Promise<BigNumber>;

    "currentPhase()"(overrides?: CallOverrides): Promise<BigNumber>;

    hookCondition(overrides?: CallOverrides): Promise<BigNumber>;

    "hookCondition()"(overrides?: CallOverrides): Promise<BigNumber>;

    phaseAtBlockNumber(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "phaseAtBlockNumber(uint32[8],uint32)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    phaseBlocks(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "phaseBlocks(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    runsOnlyAtLeastPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "runsOnlyAtLeastPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    runsOnlyPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "runsOnlyPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    testScheduleNextPhase(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "testScheduleNextPhase(uint32)"(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    toggleHookCondition(overrides?: Overrides): Promise<BigNumber>;

    "toggleHookCondition()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    UNINITIALIZED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "UNINITIALIZED()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    blockNumberForPhase(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "blockNumberForPhase(uint32[8],uint8)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentPhase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "currentPhase()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hookCondition(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "hookCondition()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    phaseAtBlockNumber(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "phaseAtBlockNumber(uint32[8],uint32)"(
      phaseBlocks_: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      blockNumber_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    phaseBlocks(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "phaseBlocks(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    runsOnlyAtLeastPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "runsOnlyAtLeastPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    runsOnlyPhase(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "runsOnlyPhase(uint8)"(
      phase_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    testScheduleNextPhase(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "testScheduleNextPhase(uint32)"(
      nextPhaseBlock_: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    toggleHookCondition(overrides?: Overrides): Promise<PopulatedTransaction>;

    "toggleHookCondition()"(
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}