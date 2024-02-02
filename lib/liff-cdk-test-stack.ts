import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class LiffCdkTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const liffTestBucket = new s3.Bucket(this, 'LiffTestBucket', {
      websiteErrorDocument: 'index.html',
      websiteIndexDocument: 'index.html',
    });

    const liffTestIdentity = new cloudfront.OriginAccessIdentity(this, 'LiffTestIdentity');

    const liffTestBucketPolicyStatement = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: iam.Effect.ALLOW,
      principals: [
        liffTestIdentity.grantPrincipal,
      ],
      resources: [`${liffTestBucket.bucketArn}/*`],
    });

    const liffTestDistribution = new cloudfront.CloudFrontWebDistribution(
      this, 'LiffTestDistribution', {
        errorConfigurations: [
          {
            errorCachingMinTtl: 300,
            errorCode: 403,
            responseCode: 200,
            responsePagePath: '/index.html',
          },
          {
            errorCachingMinTtl: 300,
            errorCode: 404,
            responseCode: 200,
            responsePagePath: '/index.html',
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: liffTestBucket,
              originAccessIdentity: liffTestIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      },
    );

    new s3deploy.BucketDeployment(this, 'LiffTestDeploy', {
      sources: [s3deploy.Source.asset('./LiffTest/dist')],
      destinationBucket: liffTestBucket,
      distribution: liffTestDistribution,
      distributionPaths: ['/*'],
    });
  }
}
