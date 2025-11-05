
terraform init         # Initialize
terraform plan         # Show what changes will happen
terraform apply        # Create/update resources
terraform destroy      # Tear down resources


# How Terraform knows your AWS credentials
# -Terraform uses the same credentials that the AWS SDK or CLI would use, in this order:
# - teffromf ireclty calls the api here
# Environment variables

# export AWS_ACCESS_KEY_ID="xxx"
# export AWS_SECRET_ACCESS_KEY="yyy"
# export AWS_REGION="ap-south-1"


# Shared credentials file (~/.aws/credentials)

# EC2 instance IAM role (if running Terraform on an EC2 instance with an assigned role)

# AWS CLI config file (~/.aws/config)

# So Terraform directly calls AWS APIs using these credentials — no CLI needed.

