# Self Notes for Approaching Auditing:

# Steps to Audit Report:
- client has reached out for audit on their codebase

# Scoping: 
- raw etherscan (scoping phase => understand the contrasct)
- somtimes clients give the etherscan url
- as a secruit researcher you are also an educator to educate the protocol & team about the security best practises
- if they are not taking security seriously (teach me & make sure they are willing to learn)
- then ask for the minimal onboarding (templates in github repo associated)
- filled the info & have the onboarding details now
- can switch to diff branches => git checkout <commit hash>
- can git switch -c password-store-aduit => creating a new one here
- now scoping is done here & can start here (commit hash is needed to be done => to make sure the required branch is taken over here)
- filled the info & have the onboarding details now
- can switch to diff branches => git checkout <commit hash>
- can git switch -c password-store-aduit => creating a new one here
- now scoping is done here & can start here
(commit hash is needed to be done => to make sure the required branch is taken over here)

# Cloc (Counting lines of Code): 
- tool to do this: https://github.com/AlDanial/cloc
- counts the lines of code (can download it here =>via package manager (npm here))
- install it and work with it: use of cloc: cloc <directory>
- get pace to audit in terms of the loc (lines of code here taken)
- competitive audits have quick timelines => make the timeline match your pace here
- start audting (either when working in a big udting firm) + or own start
- or smart contract auditing done here & changed the branch => onbaording here
- try solidity mertics (and the paste this into notion docs or google etc)
- start line by line (from top to bottom)
- after done => remove the @q => questions here (written in between the code)
- check tests folder & script folder (test for all edge cases) => forge covergae
(should make great test covergae)

- now identifed 3 vulnergbaluties => how to report it to the protocol
- prove to them why it is an issue and go to them
- convery this info to the protocol here & why they missed it 
- writing first finding report here

- cast storage <contract-address from deloy script> --rpc-url http://127.0.0.1:8545 => byte respenation of the password  herecast parse butes-32-syring <paste here>
(now the password is vibsle to us read from onchain here)

# Code Review:
- don't start with audit-data branch (answer key here)
- find time to find bugs (30 min etc)
- It wil include lot of not undertstanding, not found etc
(thats what the process will feel lie)

