resource "aws_instance" "frontend" {
  ami           = "ami-xxxxxx"
  instance_type = "t3.micro"
}

resource "aws_lb" "frontend_alb" {
  name               = "nextjs-alb"
  load_balancer_type = "application"
  subnets            = ["subnet-123", "subnet-456"]
}

# multicloud approahc:
# Terraform is like “React for infrastructure” in the sense that:
# You write declarative code to describe your infrastructure.
# You can re-use modules/components (like React components).
# The same code can be applied across multiple providers (AWS, Azure, GCP, etc.).

# Security Group
resource "aws_security_group" "frontend_sg" {
  name        = "frontend-sg"
  description = "Allow HTTP"
  vpc_id      = "vpc-xxxxxx"  # Replace with your VPC

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 instance
resource "aws_instance" "frontend" {
  ami           = "ami-0abcdef1234567890" # Amazon Linux 2
  instance_type = "t3.micro"
  key_name      = "your-key"
  security_groups = [aws_security_group.frontend_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user
              docker pull anishsabharwal/nft-marketplace:latest
              docker run -d -p 3000:3000 anishsabharwal/nft-marketplace:latest
              EOF

  tags = {
    Name = "NextjsFrontend"
  }
}

# Outputs
output "instance_ip" {
  value = aws_instance.frontend.public_ip
}
