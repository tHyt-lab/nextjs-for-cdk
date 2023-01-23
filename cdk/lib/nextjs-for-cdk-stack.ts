import * as cdk from "aws-cdk-lib";
import { RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";

export class NextjsForCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deployBucket = new cdk.aws_s3.Bucket(this, "DeployBucket", {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      accessControl: cdk.aws_s3.BucketAccessControl.PRIVATE,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
    });

    // cloudfront
    const originAccessIdentity = new cdk.aws_cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    const deployBucketPolicyStatement = new cdk.aws_iam.PolicyStatement({
      actions: ["s3:GetObject"],
      effect: cdk.aws_iam.Effect.ALLOW,
      principals: [
        new cdk.aws_iam.CanonicalUserPrincipal(
          originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
      resources: [`${deployBucket.bucketArn}/*`],
    });

    deployBucket.addToResourcePolicy(deployBucketPolicyStatement);

    const distribution = new cdk.aws_cloudfront.Distribution(
      this,
      "Distribution",
      {
        httpVersion: cdk.aws_cloudfront.HttpVersion.HTTP3,
        defaultRootObject: "index.html",
        defaultBehavior: {
          allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
          cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
          viewerProtocolPolicy:
            cdk.aws_cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
          origin: new cdk.aws_cloudfront_origins.S3Origin(deployBucket, {
            originAccessIdentity,
          }),
        },
      }
    );

    new cdk.aws_s3_deployment.BucketDeployment(this, "Deploy", {
      sources: [cdk.aws_s3_deployment.Source.asset("../out")],
      destinationBucket: deployBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
