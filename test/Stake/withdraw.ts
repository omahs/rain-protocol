import { assert } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { ReserveToken } from "../../typechain/ReserveToken";
import { StakeConfigStruct } from "../../typechain/Stake";
import { StakeFactory } from "../../typechain/StakeFactory";
import { ONE, sixZeros } from "../../utils/constants/bigNumber";
import { basicDeploy } from "../../utils/deploy/basic";
import { stakeDeploy } from "../../utils/deploy/stake";
import { assertError } from "../../utils/test/assertError";

describe("Stake withdraw", async function () {
  let stakeFactory: StakeFactory & Contract;
  let token: ReserveToken & Contract;

  before(async () => {
    const stakeFactoryFactory = await ethers.getContractFactory(
      "StakeFactory",
      {}
    );
    stakeFactory = (await stakeFactoryFactory.deploy()) as StakeFactory &
      Contract;
    await stakeFactory.deployed();
  });

  beforeEach(async () => {
    token = (await basicDeploy("ReserveToken", {})) as ReserveToken & Contract;
  });

  it("should not process a withdraw of 0 amount", async function () {
    this.timeout(0);

    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const alice = signers[2];

    const stakeConfigStruct: StakeConfigStruct = {
      name: "Stake Token",
      symbol: "STKN",
      token: token.address,
      initialRatio: ONE,
    };

    const stake = await stakeDeploy(deployer, stakeFactory, stakeConfigStruct);

    await assertError(
      async () => await stake.connect(alice).withdraw(0),
      "0_AMOUNT",
      "wrongly processed withdraw of 0 stTokens"
    );
  });

  it("should process withdraws", async function () {
    this.timeout(0);

    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const alice = signers[2];
    const bob = signers[3];

    const stakeConfigStruct: StakeConfigStruct = {
      name: "Stake Token",
      symbol: "STKN",
      token: token.address,
      initialRatio: ONE,
    };

    const stake = await stakeDeploy(deployer, stakeFactory, stakeConfigStruct);

    // Give Alice some reserve tokens and deposit them
    await token.transfer(
      alice.address,
      ethers.BigNumber.from("1000" + sixZeros)
    );
    const tokenBalanceAlice0 = await token.balanceOf(alice.address);
    await token.connect(alice).approve(stake.address, tokenBalanceAlice0);
    await stake.connect(alice).deposit(tokenBalanceAlice0);

    // Give Bob some reserve tokens and deposit them
    await token.transfer(bob.address, ethers.BigNumber.from("1000" + sixZeros));
    const tokenBalanceBob0 = await token.balanceOf(bob.address);
    await token.connect(bob).approve(stake.address, tokenBalanceBob0);
    await stake.connect(bob).deposit(tokenBalanceBob0);

    // Alice and Bob each own 50% of stToken supply
    const stTokenBalanceAlice0 = await stake.balanceOf(alice.address);
    const stTokenBalanceBob0 = await stake.balanceOf(bob.address);

    assert(
      stTokenBalanceAlice0.eq(stTokenBalanceBob0),
      "alice and bob do not own equal amounts of stToken when initialRatio = 1 and when they deposited same amount of token"
    );

    const tokenPool0 = await token.balanceOf(stake.address);

    // Alice redeems all her stTokens to withdraw share of tokens she is entitled to
    await stake.connect(alice).withdraw(stTokenBalanceAlice0);

    const stTokenBalanceAlice1 = await stake.balanceOf(alice.address);
    const tokenBalanceAlice1 = await token.balanceOf(alice.address);

    assert(stTokenBalanceAlice1.isZero(), "did not burn alice's stTokens");
    assert(
      tokenBalanceAlice1.eq(tokenPool0.div(2)),
      `alice did not receive correct pro rata share of tokens from stake contract when withdrawing
      expected  ${tokenPool0.div(2)}
      got       ${tokenBalanceAlice1}`
    );
  });
});