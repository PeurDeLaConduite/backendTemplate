## AWS Amplify Next.js (App Router) Starter Template

This repository provides a starter template for creating applications using Next.js (App Router) and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational Next.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

```
memo pour moi pas pour agent.md

aws sts get-caller-identity --profile amplify-admin | Out-Host

npx ampx sandbox --profile amplify-admin
```
```
MODEL de amplify_outputs.json

{
    "auth": {
        "user_pool_id": "eu-west-3_Z55OsAOSR",
        "aws_region": "eu-west-3",
        "user_pool_client_id": "6929sa121a0ajpvpnjcdsnu5ts",
        "identity_pool_id": "eu-west-3:52e52148-6659-4414-801a-f4380fce2656",
        "mfa_methods": [],
        "standard_required_attributes": ["email"],
        "username_attributes": ["email"],
        "user_verification_types": ["email"],
        "groups": [],
        "mfa_configuration": "NONE",
        "password_policy": {
            "min_length": 8,
            "require_lowercase": true,
            "require_numbers": true,
            "require_symbols": true,
            "require_uppercase": true
        },
        "unauthenticated_identities_enabled": true
    },
    "data": {
        "url": "https://nzp4jr3syredthhr4t7yu6bhpy.appsync-api.eu-west-3.amazonaws.com/graphql",
        "aws_region": "eu-west-3",
        "default_authorization_type": "AMAZON_COGNITO_USER_POOLS",
        "authorization_types": ["AWS_IAM"],
        "model_introspection": {
            "version": 1,
            "models": {
                "UserProfile": {
                    "name": "UserProfile",
                    "fields": {
                        "id": {
                            "name": "id",
                            "isArray": false,
                            "type": "ID",
                            "isRequired": true,
                            "attributes": []
                        },
                        "firstName": {
                            "name": "firstName",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "familyName": {
                            "name": "familyName",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "address": {
                            "name": "address",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "postalCode": {
                            "name": "postalCode",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "city": {
                            "name": "city",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "country": {
                            "name": "country",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "phoneNumber": {
                            "name": "phoneNumber",
                            "isArray": false,
                            "type": "String",
                            "isRequired": false,
                            "attributes": []
                        },
                        "createdAt": {
                            "name": "createdAt",
                            "isArray": false,
                            "type": "AWSDateTime",
                            "isRequired": false,
                            "attributes": [],
                            "isReadOnly": true
                        },
                        "updatedAt": {
                            "name": "updatedAt",
                            "isArray": false,
                            "type": "AWSDateTime",
                            "isRequired": false,
                            "attributes": [],
                            "isReadOnly": true
                        }
                    },
                    "syncable": true,
                    "pluralName": "UserProfiles",
                    "attributes": [
                        {
                            "type": "model",
                            "properties": {}
                        },
                        {
                            "type": "auth",
                            "properties": {
                                "rules": [
                                    {
                                        "provider": "userPools",
                                        "ownerField": "owner",
                                        "allow": "owner",
                                        "identityClaim": "cognito:username",
                                        "operations": ["create", "update", "delete", "read"]
                                    }
                                ]
                            }
                        }
                    ],
                    "primaryKeyInfo": {
                        "isCustomPrimaryKey": false,
                        "primaryKeyFieldName": "id",
                        "sortKeyFieldNames": []
                    }
                }
            },
            "enums": {},
            "nonModels": {}
        }
    },
    "storage": {
        "aws_region": "eu-west-3",
        "bucket_name": "amplify-d2jefuxcjjakai-ma-publiquestoragebucketac0-tjlluvtci6g6",
        "buckets": [
            {
                "name": "PubliqueStorage",
                "bucket_name": "amplify-d2jefuxcjjakai-ma-publiquestoragebucketac0-tjlluvtci6g6",
                "aws_region": "eu-west-3",
                "paths": {
                    "publique-storage/*": {
                        "guest": ["get", "list"],
                        "authenticated": ["get", "list", "write", "delete"]
                    }
                }
            }
        ]
    },
    "version": "1.3"
}
```