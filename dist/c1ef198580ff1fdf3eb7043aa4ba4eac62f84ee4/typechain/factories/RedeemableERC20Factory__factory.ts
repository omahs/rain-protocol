/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { RedeemableERC20Factory } from "../RedeemableERC20Factory";

export class RedeemableERC20Factory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<RedeemableERC20Factory> {
    return super.deploy(overrides || {}) as Promise<RedeemableERC20Factory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RedeemableERC20Factory {
    return super.attach(address) as RedeemableERC20Factory;
  }
  connect(signer: Signer): RedeemableERC20Factory__factory {
    return super.connect(signer) as RedeemableERC20Factory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RedeemableERC20Factory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as RedeemableERC20Factory;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "NewContract",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "createChild",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "contract ITier",
            name: "tier",
            type: "address",
          },
          {
            internalType: "enum ITier.Tier",
            name: "minimumStatus",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
        ],
        internalType: "struct RedeemableERC20Config",
        name: "config_",
        type: "tuple",
      },
    ],
    name: "createChild",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "maybeChild_",
        type: "address",
      },
    ],
    name: "isChild",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060016000556144c9806100256000396000f3fe60806040523480156200001157600080fd5b5060043610620000465760003560e01c80632ea72a49146200004b5780639bfa20bb146200007a578063fc91a8971462000091575b600080fd5b620000626200005c36600462000415565b620000b7565b60405162000071919062000667565b60405180910390f35b620000626200008b36600462000487565b6200019d565b620000a8620000a2366004620003d0565b62000257565b60405162000071919062000688565b60006002600054141562000102576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000f990620006a8565b60405180910390fd5b6002600090815562000115848462000282565b73ffffffffffffffffffffffffffffffffffffffff8116600081815260016020819052604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169092179091555192935090917f387ea218537e939551af33bbc2dd6c53b1fee55d377a0dce288258f972cb3a9c9190a260016000559392505050565b60003073ffffffffffffffffffffffffffffffffffffffff16632ea72a4983604051602001620001ce9190620006df565b6040516020818303038152906040526040518263ffffffff1660e01b8152600401620001fb919062000693565b602060405180830381600087803b1580156200021657600080fd5b505af11580156200022b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002519190620003f6565b92915050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205460ff1690565b60006200028e620002e2565b6200029c83850185620004c2565b9050600081604051620002af9062000319565b620002bb9190620007d2565b604051809103906000f080158015620002d8573d6000803e3d6000fd5b5095945050505050565b6040805160c08101825260008082526060602083018190529282018390529181018290529060808201908152602001600081525090565b613b50806200094483390190565b803562000251816200091d565b8035600981106200025157600080fd5b600082601f83011262000355578081fd5b813567ffffffffffffffff8111156200036c578182fd5b6200039f60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160162000888565b9150808252836020828501011115620003b757600080fd5b8060208401602084013760009082016020015292915050565b600060208284031215620003e2578081fd5b8135620003ef816200091d565b9392505050565b60006020828403121562000408578081fd5b8151620003ef816200091d565b6000806020838503121562000428578081fd5b823567ffffffffffffffff8082111562000440578283fd5b818501915085601f83011262000454578283fd5b81358181111562000463578384fd5b86602082850101111562000475578384fd5b60209290920196919550909350505050565b60006020828403121562000499578081fd5b813567ffffffffffffffff811115620004b0578182fd5b820160c08185031215620003ef578182fd5b600060208284031215620004d4578081fd5b813567ffffffffffffffff80821115620004ec578283fd5b9083019060c0828603121562000500578283fd5b6200050c60c062000888565b62000518868462000327565b81526020830135828111156200052c578485fd5b6200053a8782860162000344565b60208301525060408301358281111562000552578485fd5b620005608782860162000344565b60408301525062000575866060850162000327565b606082015262000589866080850162000334565b608082015260a083013560a082015280935050505092915050565b60008151808452815b81811015620005cb57602081850181015186830182015201620005ad565b81811115620005dd5782602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600981106200061b57fe5b9052565b600082845282826020860137806020848601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f85011685010190509392505050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b901515815260200190565b600060208252620003ef6020830184620005a4565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b6000602082528235620006f2816200091d565b73ffffffffffffffffffffffffffffffffffffffff80821660208501526200071e6020860186620008b0565b925060c060408601526200073760e0860184836200061f565b925050620007496040860186620008b0565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0868503016060870152620007808482846200061f565b93505050606085013562000794816200091d565b8181166080860152505060a08401620007b1816080870162000334565b620007c060a086018262000610565b503560c0939093019290925250919050565b60006020825273ffffffffffffffffffffffffffffffffffffffff808451166020840152602084015160c060408501526200081160e0850182620005a4565b905060408501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08583030160608601526200084e8282620005a4565b915050816060860151166080850152608085015191506200087360a085018362000610565b60a085015160c0850152809250505092915050565b60405181810167ffffffffffffffff81118282101715620008a857600080fd5b604052919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112620008e5578283fd5b830160208101925035905067ffffffffffffffff8111156200090657600080fd5b8036038313156200091657600080fd5b9250929050565b73ffffffffffffffffffffffffffffffffffffffff811681146200094057600080fd5b5056fe61018060405263ffffffff608081815260a082905260c082905260e08290526101008290526101208290526101408290526101609190915262000047906001906008620006f9565b503480156200005557600080fd5b5060405162003b5038038062003b50833981016040819052620000789162000909565b60208181015160408301516060840151600280546001600160a01b0319166001600160a01b0390921691909117905543600355815191929091620000c391600791908501906200079c565b508051620000d99060089060208401906200079c565b50506009805460ff19166012179055506001600a5560a0810151670de0b6b3a76400001115620001265760405162461bcd60e51b81526004016200011d9062000ab9565b60405180910390fd5b6080810151600c805460ff191660018360088111156200014257fe5b0217905550805162000157906000906200018f565b8051620001759060008051602062003b30833981519152906200018f565b805160a08201516200018891906200019f565b5062000b57565b6200019b828262000284565b5050565b6001600160a01b038216620001c85760405162461bcd60e51b81526004016200011d9062000af0565b620001d660008383620002fd565b620001f2816006546200044a60201b620013461790919060201c565b6006556001600160a01b03821660009081526004602090815260409091205462000227918390620013466200044a821b17901c565b6001600160a01b0383166000818152600460205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906200027890859062000b27565b60405180910390a35050565b600082815260208181526040909120620002a9918390620013856200047b821b17901c565b156200019b57620002b962000492565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b620003158383836200044560201b62000b791760201c565b6001600160a01b038216301415620003415760405162461bcd60e51b81526004016200011d9062000a90565b6000811180156200039d5750620003797fcf2b1209506b76f140fb1bc5fe66d6e42627c4b9703a951d65552f50f14c9ee78462000496565b806200039b57506200039b60008051602062003b308339815191528362000496565b155b1562000445576000620003af620004ba565b6008811115620003bb57fe5b1415620003fa57600c54620003d590839060ff1662000529565b620003f45760405162461bcd60e51b81526004016200011d9062000a17565b62000445565b600162000406620004ba565b60088111156200041257fe5b141562000443576001600160a01b03821615620003f45760405162461bcd60e51b81526004016200011d9062000a70565bfe5b505050565b600082820183811015620004725760405162461bcd60e51b81526004016200011d9062000a39565b90505b92915050565b600062000472836001600160a01b038416620005d5565b3390565b600082815260208181526040822062000472918490620013a762000624821b17901c565b604080516101008101918290526000916200052491906001906008908286855b82829054906101000a900463ffffffff1663ffffffff1681526020019060040190602082600301049283019260010382029150808411620004da5750439450506200063b92505050565b905090565b60025460405163e053ea3160e01b8152600091620005c9916001600160a01b039091169063e053ea31906200056390879060040162000a03565b60206040518083038186803b1580156200057c57600080fd5b505afa15801562000591573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005b79190620009ea565b836200069760201b620013c91760201c565b60035410159392505050565b6000620005e38383620006e1565b6200061b5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000475565b50600062000475565b600062000472836001600160a01b038416620006e1565b6000805b60088110156200068e578381600881106200065657fe5b602002015163ffffffff168363ffffffff16101562000685578060088111156200067c57fe5b91505062000475565b6001016200063f565b50600862000472565b600080826008811115620006a757fe5b1415620006b75750600062000475565b60006001836008811115620006c857fe5b0360200290508084901c63ffffffff1691505092915050565b60009081526001919091016020526040902054151590565b6001830191839082156200078a5791602002820160005b838211156200075657835183826101000a81548163ffffffff021916908363ffffffff160217905550926020019260040160208160030104928301926001030262000710565b8015620007885782816101000a81549063ffffffff021916905560040160208160030104928301926001030262000756565b505b50620007989291506200081d565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620007df57805160ff19168380011785556200080f565b828001600101855582156200080f579182015b828111156200080f578251825591602001919060010190620007f2565b50620007989291506200083b565b5b808211156200079857805463ffffffff191681556001016200081e565b5b808211156200079857600081556001016200083c565b80516001600160a01b03811681146200047557600080fd5b8051600981106200047557600080fd5b600082601f8301126200088b578081fd5b81516001600160401b03811115620008a1578182fd5b6020620008b7601f8301601f1916820162000b30565b92508183528481838601011115620008ce57600080fd5b60005b82811015620008ee578481018201518482018301528101620008d1565b82811115620009005760008284860101525b50505092915050565b6000602082840312156200091b578081fd5b81516001600160401b038082111562000932578283fd5b9083019060c0828603121562000946578283fd5b6200095260c062000b30565b6200095e868462000852565b815260208301518281111562000972578485fd5b62000980878286016200087a565b60208301525060408301518281111562000998578485fd5b620009a6878286016200087a565b604083015250620009bb866060850162000852565b6060820152620009cf86608085016200086a565b608082015260a083015160a082015280935050505092915050565b600060208284031215620009fc578081fd5b5051919050565b6001600160a01b0391909116815260200190565b60208082526008908201526726a4a72faa24a2a960c11b604082015260600190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b602080825260069082015265232927ad22a760d11b604082015260600190565b6020808252600f908201526e2a27a5a2a72fa9a2a7222fa9a2a62360891b604082015260600190565b60208082526016908201527f4d494e494d554d5f494e495449414c5f535550504c5900000000000000000000604082015260600190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b6040518181016001600160401b038111828210171562000b4f57600080fd5b604052919050565b612fc98062000b676000396000f3fe608060405234801561001057600080fd5b50600436106102d35760003560e01c806381e45d9a11610186578063a9059cbb116100e3578063d547741f11610097578063de1533ba11610071578063de1533ba14610578578063f1ebd5dd1461058b578063fa5070a014610593576102d3565b8063d547741f1461053f578063db006a7514610552578063dd62ed3e14610565576102d3565b8063ad7430cc116100c8578063ad7430cc14610511578063c5c97ece14610519578063ca15c8731461052c576102d3565b8063a9059cbb146104f6578063ad3cb10314610509576102d3565b80639923c94b1161013a578063a217fddf1161011f578063a217fddf146104d3578063a30872db146104db578063a457c2d7146104e3576102d3565b80639923c94b146104ad5780639e46cb42146104c0576102d3565b806391d148541161016b57806391d148541461048a57806395d89b411461049d57806396773ebe146104a5576102d3565b806381e45d9a146104625780639010d07c1461046a576102d3565b806334c1df751161023457806353bcb325116101e857806370a08231116101cd57806370a082311461042957806377544f331461043c57806379cc67901461044f576102d3565b806353bcb325146104195780636050f2f814610421576102d3565b8063395093511161021957806339509351146103d357806342966c68146103e657806345bdfa8a146103f9576102d3565b806334c1df75146103ad57806336568abe146103c0576102d3565b80631c77bb2c1161028b578063248a9ca311610270578063248a9ca3146103705780632f2ff15d14610383578063313ce56714610398576102d3565b80631c77bb2c1461034857806323b872dd1461035d576102d3565b8063095ea7b3116102bc578063095ea7b31461030b5780630f0af57f1461032b57806318160ddd14610340576102d3565b8063055ad42e146102d857806306fdde03146102f6575b600080fd5b6102e061059b565b6040516102ed9190612637565b60405180910390f35b6102fe610606565b6040516102ed919061264a565b61031e61031936600461231b565b6106ba565b6040516102ed9190612623565b6103336106d8565b6040516102ed919061262e565b6103336106de565b6103506106e4565b6040516102ed91906125b3565b61031e61036b3660046122ae565b61076a565b61033361037e3660046124bf565b61080c565b6103966103913660046124d7565b610821565b005b6103a061088c565b6040516102ed9190612e0a565b6102e06103bb36600461241b565b610895565b6103966103ce3660046124d7565b6108ec565b61031e6103e136600461231b565b610962565b6103966103f43660046124bf565b6109bd565b61040c6104073660046123ea565b6109d1565b6040516102ed9190612df9565b6103a0610a19565b610333610a1e565b61033361043736600461225a565b610a42565b61031e61044a3660046122ee565b610a6a565b61039661045d36600461231b565b610b29565b61040c610b7e565b61047d6104783660046124fb565b610ba2565b6040516102ed919061256c565b61031e6104983660046124d7565b610bba565b6102fe610bd2565b610333610c51565b61040c6104bb3660046124bf565b610c75565b6103966104ce36600461225a565b610ca2565b610333610e49565b61047d610e4e565b61031e6104f136600461231b565b610e6a565b61031e61050436600461231b565b610edf565b610333610ef3565b610333610eff565b610396610527366004612346565b610f23565b61033361053a3660046124bf565b61113d565b61039661054d3660046124d7565b611154565b6103966105603660046124bf565b6111a8565b610333610573366004612276565b611219565b61039661058636600461225a565b611251565b6102e0611319565b610333611322565b6040805161010081019182905260009161060191906001906008908286855b82829054906101000a900463ffffffff1663ffffffff16815260200190600401906020826003010492830192600103820291508084116105ba579050505050505043610895565b905090565b60078054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106b05780601f10610685576101008083540402835291602001916106b0565b820191906000526020600020905b81548152906001019060200180831161069357829003601f168201915b5050505050905090565b60006106ce6106c761140f565b8484611413565b5060015b92915050565b60035481565b60065490565b6106ec612230565b6106f4612230565b60005b600b5481101561076457600b818154811061070e57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1682826008811061073c57fe5b73ffffffffffffffffffffffffffffffffffffffff90921660209290920201526001016106f7565b50905090565b6000610777848484611522565b6108018461078361140f565b6107fc85604051806060016040528060288152602001612f236028913973ffffffffffffffffffffffffffffffffffffffff8a166000908152600560205260408120906107ce61140f565b73ffffffffffffffffffffffffffffffffffffffff16815260208101919091526040016000205491906116ac565b611413565b5060015b9392505050565b60009081526020819052604090206002015490565b60008281526020819052604090206002015461083f9061049861140f565b61087e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612755565b60405180910390fd5b61088882826116f2565b5050565b60095460ff1690565b6000805b60088110156108e2578381600881106108ae57fe5b602002015163ffffffff168363ffffffff1610156108da578060088111156108d257fe5b9150506106d2565b600101610899565b5060089392505050565b6108f461140f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612d9c565b6108888282611775565b60006106ce61096f61140f565b846107fc856005600061098061140f565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918c168152925290205490611346565b6109ce6109c861140f565b826117f8565b50565b6000808260088111156109e057fe5b116109ec576000610805565b8260018360088111156109fb57fe5b0360088110610a0657fe5b6020020160208101906108059190612534565b600881565b7fcf2b1209506b76f140fb1bc5fe66d6e42627c4b9703a951d65552f50f14c9ee781565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b6002546040517fe053ea31000000000000000000000000000000000000000000000000000000008152600091610b1d9173ffffffffffffffffffffffffffffffffffffffff9091169063e053ea3190610ac790879060040161256c565b60206040518083038186803b158015610adf57600080fd5b505afa158015610af3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b17919061251c565b836113c9565b60035410159392505050565b6000610b5b82604051806060016040528060248152602001612f4b60249139610b548661057361140f565b91906116ac565b9050610b6f83610b6961140f565b83611413565b610b7983836117f8565b505050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81565b60008281526020819052604081206108059083611928565b600082815260208190526040812061080590836113a7565b60088054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106b05780601f10610685576101008083540402835291602001916106b0565b7fa67ce9b482cd7c7b30f4cea2f7e71abe8f7040cc572c570552199c488f160ad181565b60018160088110610c8257fe5b60089182820401919006600402915054906101000a900463ffffffff1681565b610ccc7fa638e6d52802f3ab217de611c9b2d0023a709998a8ce9b01094ec3fdb3ded4e233610bba565b610d02576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612d65565b600b54600811610d3e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612d2e565b60005b600b54811015610dd1578173ffffffffffffffffffffffffffffffffffffffff16600b8281548110610d6f57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff161415610dc9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612922565b600101610d41565b50600b80546001810182556000919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600081565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60006106ce610e7761140f565b846107fc85604051806060016040528060258152602001612f6f6025913960056000610ea161140f565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918d168152925290205491906116ac565b60006106ce610eec61140f565b8484611522565b670de0b6b3a764000081565b7f94201143cc0a32610f14f8f185ebb23e4ca60f1758e49668647d0879b1e81f0b81565b600180610f2e61059b565b6008811115610f3957fe5b14610f70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906128eb565b6002600a541415610fad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612cf7565b6002600a556000610fbc6106de565b9050610fc833846117f8565b60005b8451811015611131576000858281518110610fe257fe5b60200260200101519050600061108b84611085888573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161102f919061256c565b60206040518083038186803b15801561104757600080fd5b505afa15801561105b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107f919061251c565b90611934565b90611988565b90508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167ff8eb02c03b445447861a4fda33b7470adf3b693b314b35a1efb8203edc28d65660405180604001604052808a8152602001858152506040516110fe91906125fb565b60405180910390a361112773ffffffffffffffffffffffffffffffffffffffff831633836119ca565b5050600101610fcb565b50506001600a55505050565b60008181526020819052604081206106d290611a6b565b6000828152602081905260409020600201546111729061049861140f565b610958576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906129b6565b6109ce600b80548060200260200160405190810160405280929190818152602001828054801561120e57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116111e3575b505050505082610f23565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205490565b60008061125c61059b565b600881111561126757fe5b1461129e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906128eb565b6112c87fa67ce9b482cd7c7b30f4cea2f7e71abe8f7040cc572c570552199c488f160ad133610bba565b6112fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612cc0565b61130743611a76565b6108888261131484610a42565b6117f8565b600c5460ff1681565b7fa638e6d52802f3ab217de611c9b2d0023a709998a8ce9b01094ec3fdb3ded4e281565b600082820183811015610805576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108759061287d565b60006108058373ffffffffffffffffffffffffffffffffffffffff8416611bec565b60006108058373ffffffffffffffffffffffffffffffffffffffff8416611c36565b6000808260088111156113d857fe5b14156113e6575060006106d2565b600060018360088111156113f657fe5b0360200290508084901c63ffffffff1691505092915050565b3390565b73ffffffffffffffffffffffffffffffffffffffff8316611460576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612bcf565b73ffffffffffffffffffffffffffffffffffffffff82166114ad576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906127e9565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526005602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061151590859061262e565b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff831661156f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612b3b565b73ffffffffffffffffffffffffffffffffffffffff82166115bc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906126f8565b6115c7838383611c4e565b61161181604051806060016040528060268152602001612efd6026913973ffffffffffffffffffffffffffffffffffffffff861660009081526004602052604090205491906116ac565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260046020526040808220939093559084168152205461164d9082611346565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526004602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061151590859061262e565b600081848411156116ea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875919061264a565b505050900390565b600082815260208190526040902061170a9082611385565b156108885761171761140f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260208190526040902061178d9082611de7565b156108885761179a61140f565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b73ffffffffffffffffffffffffffffffffffffffff8216611845576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612ade565b61185182600083611c4e565b61189b81604051806060016040528060228152602001612edb6022913973ffffffffffffffffffffffffffffffffffffffff851660009081526004602052604090205491906116ac565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600460205260409020556006546118ce9082611e09565b60065560405160009073ffffffffffffffffffffffffffffffffffffffff8416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061191c90859061262e565b60405180910390a35050565b60006108058383611e4b565b600082611943575060006106d2565b8282028284828161195057fe5b0414610805576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612a81565b600061080583836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611eaa565b610b798363a9059cbb60e01b84846040516024016119e992919061258d565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611efb565b60006106d282611fb1565b8063ffffffff164363ffffffff161115611abc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906127b2565b63ffffffff81811610611afb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875906128b4565b6000611b0561059b565b6008811115611b1057fe5b905060018160088110611b1f57fe5b60088104919091015460079091166004026101000a900463ffffffff90811614611b75576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612b98565b611b7e82611fb5565b8160018260088110611b8c57fe5b600891828204019190066004026101000a81548163ffffffff021916908363ffffffff1602179055508163ffffffff167f260aac5b840edc27b89fdf50e91311a413363a400959466e1049e6d071b8cee260405160405180910390a25050565b6000611bf88383611c36565b611c2e575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556106d2565b5060006106d2565b60009081526001919091016020526040902054151590565b611c59838383610b79565b73ffffffffffffffffffffffffffffffffffffffff8216301415611ca9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612a4a565b600081118015611d105750611cde7fcf2b1209506b76f140fb1bc5fe66d6e42627c4b9703a951d65552f50f14c9ee784610bba565b80611d0e5750611d0e7f94201143cc0a32610f14f8f185ebb23e4ca60f1758e49668647d0879b1e81f0b83610bba565b155b15610b79576000611d1f61059b565b6008811115611d2a57fe5b1415611d7c57600c54611d4190839060ff16610a6a565b611d77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612846565b610b79565b6001611d8661059b565b6008811115611d9157fe5b1415611de55773ffffffffffffffffffffffffffffffffffffffff821615611d77576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612a13565bfe5b60006108058373ffffffffffffffffffffffffffffffffffffffff8416611fda565b600061080583836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506116ac565b81546000908210611e88576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108759061269b565b826000018281548110611e9757fe5b9060005260206000200154905092915050565b60008183611ee5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875919061264a565b506000838581611ef157fe5b0495945050505050565b6060611f5d826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166120be9092919063ffffffff16565b805190915015610b795780806020019051810190611f7b919061249f565b610b79576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612c63565b5490565b611fbe816109ce565b6002611fc861059b565b6008811115611fd357fe5b106109ce57fe5b600081815260018301602052604081205480156120b45783547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808301919081019060009087908390811061202b57fe5b906000526020600020015490508087600001848154811061204857fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061207857fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506106d2565b60009150506106d2565b60606120cd84846000856120d5565b949350505050565b606082471015612111576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612959565b61211a856121d7565b612150576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087590612c2c565b600060608673ffffffffffffffffffffffffffffffffffffffff16858760405161217a9190612550565b60006040518083038185875af1925050503d80600081146121b7576040519150601f19603f3d011682016040523d82523d6000602084013e6121bc565b606091505b50915091506121cc8282866121dd565b979650505050505050565b3b151590565b606083156121ec575081610805565b8251156121fc5782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610875919061264a565b6040518061010001604052806008906020820280368337509192915050565b80356106d281612e99565b60006020828403121561226b578081fd5b813561080581612e99565b60008060408385031215612288578081fd5b823561229381612e99565b915060208301356122a381612e99565b809150509250929050565b6000806000606084860312156122c2578081fd5b83356122cd81612e99565b925060208401356122dd81612e99565b929592945050506040919091013590565b60008060408385031215612300578182fd5b823561230b81612e99565b915060208301356122a381612ebb565b6000806040838503121561232d578182fd5b823561233881612e99565b946020939093013593505050565b60008060408385031215612358578182fd5b823567ffffffffffffffff81111561236e578283fd5b8301601f8101851361237e578283fd5b803561239161238c82612e3f565b612e18565b8082825260208083019250808501898283870288010111156123b1578788fd5b8795505b848610156123db576123c78a8261224f565b8452600195909501949281019281016123b5565b50909896013596505050505050565b60008061012083850312156123fd578182fd5b61010083018481111561240e578283fd5b839250356122a381612ebb565b600080610120838503121561242e578182fd5b83601f84011261243c578182fd5b61010061244881612e18565b9084019080858784111561245a578586fd5b855b600881101561248d57813563ffffffff81168114612478578788fd5b8452602093840193919091019060010161245c565b5090945050903590506122a381612ec8565b6000602082840312156124b0578081fd5b81518015158114610805578182fd5b6000602082840312156124d0578081fd5b5035919050565b600080604083850312156124e9578182fd5b8235915060208301356122a381612e99565b6000806040838503121561250d578182fd5b50508035926020909101359150565b60006020828403121561252d578081fd5b5051919050565b600060208284031215612545578081fd5b813561080581612ec8565b60008251612562818460208701612e5f565b9190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b6101008101818360005b60088110156125f257815173ffffffffffffffffffffffffffffffffffffffff168352602092830192909101906001016125bd565b50505092915050565b60408101818360005b60028110156125f2578151835260209283019290910190600101612604565b901515815260200190565b90815260200190565b6020810161264483612e8f565b91905290565b6000602082528251806020840152612669816040850160208701612e5f565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60208082526022908201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e60408201527f6473000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201527f6573730000000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201527f2061646d696e20746f206772616e740000000000000000000000000000000000606082015260800190565b6020808252600f908201527f4e4558545f424c4f434b5f504153540000000000000000000000000000000000604082015260600190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560408201527f7373000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526008908201527f4d494e5f54494552000000000000000000000000000000000000000000000000604082015260600190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b60208082526018908201527f4e4558545f424c4f434b5f554e494e495449414c495a45440000000000000000604082015260600190565b60208082526009908201527f4241445f50484153450000000000000000000000000000000000000000000000604082015260600190565b60208082526014908201527f4455504c49434154455f52454445454d41424c45000000000000000000000000604082015260600190565b60208082526026908201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60408201527f722063616c6c0000000000000000000000000000000000000000000000000000606082015260800190565b60208082526030908201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60408201527f2061646d696e20746f207265766f6b6500000000000000000000000000000000606082015260800190565b60208082526006908201527f46524f5a454e0000000000000000000000000000000000000000000000000000604082015260600190565b6020808252600f908201527f544f4b454e5f53454e445f53454c460000000000000000000000000000000000604082015260600190565b60208082526021908201527f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f60408201527f7700000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526021908201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360408201527f7300000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460408201527f6472657373000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252600e908201527f4e4558545f424c4f434b5f534554000000000000000000000000000000000000604082015260600190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460408201527f7265737300000000000000000000000000000000000000000000000000000000606082015260800190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60408201527f6f74207375636365656400000000000000000000000000000000000000000000606082015260800190565b60208082526017908201527f4f4e4c595f4449535452494255544f525f4255524e4552000000000000000000604082015260600190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b6020808252600f908201527f4d41585f52454445454d41424c45530000000000000000000000000000000000604082015260600190565b60208082526015908201527f4f4e4c595f52454445454d41424c455f41444445520000000000000000000000604082015260600190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201527f20726f6c657320666f722073656c660000000000000000000000000000000000606082015260800190565b63ffffffff91909116815260200190565b60ff91909116815260200190565b60405181810167ffffffffffffffff81118282101715612e3757600080fd5b604052919050565b600067ffffffffffffffff821115612e55578081fd5b5060209081020190565b60005b83811015612e7a578181015183820152602001612e62565b83811115612e89576000848401525b50505050565b600981106109ce57fe5b73ffffffffffffffffffffffffffffffffffffffff811681146109ce57600080fd5b600981106109ce57600080fd5b63ffffffff811681146109ce57600080fdfe45524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa26469706673582212207af40acc8c288427831be9a59abee73d8fe7b691dd2f0324132ed968e7fdfff264736f6c634300060c003394201143cc0a32610f14f8f185ebb23e4ca60f1758e49668647d0879b1e81f0ba2646970667358221220d01a299af6c7d3fbd46dea69a8cf5a77af40dfdc513882211935fd93b4dd818f64736f6c634300060c0033";
