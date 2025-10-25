# ANVIL_KEY=""
# # THIS IS AN ANVIL GLOBALLY KNOWN PRIVATE KEY!!
# setup-anvil:
# 	forge script script/SetupAnvil.s.sol --rpc-url http://127.0.0.1:8545 --private-key ${ANVIL_KEY} --via-ir --broadcast -vvv

# anvil: 
# 	anvil --dump-state marketplace-anvil.json

# mint-usdc:
# 	forge script script/MintUSDC.s.sol --rpc-url http://127.0.0.1:8545 --private-key ${ANVIL_KEY} --via-ir --broadcast -vvv

# Setup
deploy-all:
	forge script script/DeployYourContract.s.sol \
 		--rpc-url <RPC_URL> \
 		--private-key <PRIVATE_KEY> \
 		--broadcast \
 		--verify \
 		--etherscan-api-key <ETHERSCAN_API_KEY>


# Mint USDC (or any other script)
forge script script/MintUSDC.s.sol \
  --rpc-url $SEPOLIA_RPC \
  --private-key $SEPOLIA_KEY \
  --via-ir \
  --broadcast \
  -vvv

export SEPOLIA_KEY="0xYOUR_SEPOLIA_PRIVATE_KEY"
