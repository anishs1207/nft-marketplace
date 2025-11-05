# Validate stack
aws cloudformation validate-template --template-body file://frontend-stack.yaml

# Create stack
aws cloudformation create-stack --stack-name nextjs-frontend --template-body file://frontend-stack.yaml --capabilities CAPABILITY_NAMED_IAM

# Update stack if template changes
aws cloudformation update-stack --stack-name nextjs-frontend --template-body file://frontend-stack.yaml --capabilities CAPABILITY_NAMED_IAM
