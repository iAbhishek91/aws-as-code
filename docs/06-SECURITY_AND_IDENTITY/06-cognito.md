# Amazon cognito

- provide user an identity so that they can interact with our application. AWS Cognito provides two services
  - Cognito User Pools (CUP)
  - Cognito Identity Pools (CIP)

## Cognito User Pools

- are user directories that provides sign-up, sign-up functionality for app users.
- integrate with API gateway and application load balancer(refer: `cognito-user-pool-connection.png`)
- It creates a serverless database of users for web application or mobile applications.
- Type of login
  - Simple login using username and passowrd
  - Passowrd reset
  - Email and phone number verification
  - Multi factor auth
  - Fedrated identities: user forem Facebook, Google or SAML(security assertion markup language)
- For federated if credentials are compromised elsewhere, Cognito will block the user.
- Every login using user pool sends back a JWT token to via the API gateway to the application.
- Refer: `cognito-user-pool-architecture.png`

## Cognito Identity Pools

- provide AWS credentials to users so they can access AWS resources directly.
- can be integrated with Cognito User Pools as an identity provider.

## Cognito Sync

- Synchronize data from device to Cognito
- Is deprecated and replaced by **Apppsync**

## Difference between Cognito vs IAM

- Cognito is used for hundred of users, mobile users, authenticate with SAML
