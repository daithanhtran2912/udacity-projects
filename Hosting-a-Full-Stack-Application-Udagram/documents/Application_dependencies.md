## Dependencies
#### AWS IAM Credential:
- Create an IAM user with Admin access. Make sure to securely store the access key ID and secret access key, as you will need them to configure AWS CLI.

#### Node.js and npm:
- Install Node.js version 14.15.1 or a more recent LTS version. You can use a version manager like NVM (Node Version Manager) for better control over Node.js versions.
- To verify Node.js and npm installation using:
```bash
node -v
npm -v
```
#### AWS CLI v2:
- Install AWS CLI version 2. Follow the official AWS CLI installation guide for your operating system: [AWS CLI v2 Installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

#### RDS Database (PostgreSQL):

- Create an RDS instance running PostgreSQL. Ensure that you set inbound security rules to allow traffic from 0.0.0.0/0 for all necessary ports (e.g., 5432).
- Note down the database endpoint, username, and password for later configuration.

#### S3 Bucket for Hosting frontend application:

- Create an S3 bucket. Ensure that the bucket is configured to allow public access. You can set the bucket policy or block public access settings accordingly, and remember to enable cors for the bucket.