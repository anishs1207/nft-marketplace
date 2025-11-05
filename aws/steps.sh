# get aws security crednetails (access key id and secret access key)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="" # where to deploy (eu-north-1a etc)
# aws console > iam > user > your user > security credentails  > create access key * secret access key
# to be able to connect to aws programmatically here
# use these in secrets (do not hardcode these)

# how to pass these to docker container;
services:
  nextjs-frontend:
    image: anishsabharwal/nft-marketplace:latest
    environment:
      - AWS_ACCESS_KEY_ID=your-access-key
      - AWS_SECRET_ACCESS_KEY=your-secret-key
      - AWS_REGION=ap-south-1
    ports:
      - "3000:3000"

# or via cli:
docker run -e AWS_ACCESS_KEY_ID=xxx \
           -e AWS_SECRET_ACCESS_KEY=yyy \
           -e AWS_REGION=ap-south-1 \
           -p 3000:3000 \
           anishsabharwal/nft-marketplace:latest

# on host:
~/.aws/credentials
[default]
aws_access_key_id=xxx
aws_secret_access_key=yyy


# Option B: Mount .aws/credentials
# on your own host mahcine used here

On your host, create AWS config:

~/.aws/credentials
[default]
aws_access_key_id=xxx
aws_secret_access_key=yyy


# Mount it into container:

docker run -v ~/.aws:/root/.aws -p 3000:3000 anishsabharwal/nft-marketplace:latest


# This lets any SDK inside container (AWS SDK for Node.js, CLI, etc.) pick up credentials automatically.


# now we can programmtically cnnect to aws like cli:
# Option A: ECS / Fargate

# Pull image from Docker Hub.

# Expose port 3000 (or use a Load Balancer).

# Option B: AWS Amplify

# You can deploy Next.js frontend directly from your GitHub repo.

# No Docker needed.