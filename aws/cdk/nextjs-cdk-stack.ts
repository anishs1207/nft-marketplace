import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as autoscaling from "aws-cdk-lib/aws-autoscaling"
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2"

// if you want ro pvprovion to infro via ts or python instead of writing in yaml or json fornats

export class NextjsCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // VPC (default)
        const vpc = ec2.Vpc.fromLookup(this, "DefaultVPC", { isDefault: true })

        // Security Group
        const sg = new ec2.SecurityGroup(this, "FrontendSG", {
            vpc,
            description: "Allow HTTP and HTTPS",
            allowAllOutbound: true,
        })
        sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow HTTP")
        sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow HTTPS")

        // Launch Template / ASG
        const asg = new autoscaling.AutoScalingGroup(this, "FrontendASG", {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            machineImage: ec2.MachineImage.latestAmazonLinux(),
            securityGroup: sg,
            minCapacity: 1,
            maxCapacity: 3,
        })

        // User Data for Docker
        asg.userData.addCommands(
            "yum update -y",
            "amazon-linux-extras install docker -y",
            "service docker start",
            "usermod -a -G docker ec2-user",
            "docker pull anishsabharwal/nft-marketplace:latest",
            "docker run -d -p 3000:3000 anishsabharwal/nft-marketplace:latest"
        )

        // ALB
        const alb = new elbv2.ApplicationLoadBalancer(this, "FrontendALB", {
            vpc,
            internetFacing: true,
            securityGroup: sg,
        })

        const listener = alb.addListener("Listener", { port: 80, open: true })
        listener.addTargets("Target", {
            port: 3000,
            targets: [asg],
            healthCheck: { path: "/" },
        })

        // Output ALB DNS
        new cdk.CfnOutput(this, "ALBEndpoint", {
            value: alb.loadBalancerDnsName,
        })
    }
}
