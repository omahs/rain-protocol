// SPDX-License-Identifier: CAL
pragma solidity ^0.8.10;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// solhint-disable-next-line max-line-length
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ERC20Pull {

    using SafeERC20 for IERC20;

    function pullERC20(
        address sender_,
        IERC20 token_,
        uint256 amount_
    ) external {
        IERC20(token_).safeTransferFrom(
            sender_,
            address(this),
            amount_
        );
    }
}