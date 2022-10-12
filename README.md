# Testing time and block using hardhat-network-helpers

## Hardhat Network Helpers Overview

@nomicfoundation/hardhat-network-helpers provides a convenient JavaScript interface to the JSON-RPC functionality of Hardhat Network.

Hardhat Network exposes its custom functionality primarily through its JSON-RPC API. See the extensive set of methods available in its reference documentation. However, for easy-to-read tests and short scripts, interfacing with the JSON-RPC API is too noisy, requiring a verbose syntax and extensive conversions of both input and output data.

This package provides convenience functions for quick and easy interaction with Hardhat Network. Facilities include the ability to mine blocks up to a certain timestamp or block number, the ability to manipulate attributes of accounts (balance, code, nonce, storage), the ability to impersonate specific accounts, and the ability to take and restore snapshots.

This project demonstrates a basic Hardhat-network-helpers use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

After forking repo type ```npm i``` in your terminal.

For Smart Contract 

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
