# Serverless project with Node.js and Nest.js Framework

This repository contains the code and instructions necessary to deploy a project using Node.js and the Serverless framework. Below are the requirements, installation steps, and commands necessary to run and deploy the application.

## Requirements

- Node.js version 14 or higher
- Serverless Framework
- Nest.js CLI

## Facility

### Step 1: Installing the Serverless Framework

To deploy on AWS, it is necessary to install the Serverless framework globally. We will use `pnpm` for the installation.

```bash
pnpm install -g serverless
```

### Step 2: Installing Dependencies

Next, install the project dependencies.

```bash
pnpm install
```

### Step 3: Enviroment Variables for DB

Next, configure the variables in .env file for DB, it's possible using SUPABASE for hosting your db

```bash
DATABASE_URL="DB_ROUTE"
DIRECT_URL="DIRECT_DB_ROUTE"

```

### Step 4: Generate prisma client and push db

```bash
npx prisma generate
npx prisma db push
```

### Step 5: Local Construction and Execution

Once the dependencies are installed, the project should be compiled using NestJS and run Serverless locally for testing.

```bash
npm run build
serverless offline start
```

To access the API documentation, go to the following link: http://localhost:3000/dev/openapi#/ or postman documentacion https://documenter.getpostman.com/view/357277/2sA3XV7yq9

### Step 6: Cloud Deployment

To deploy the project to AWS, run the following command:

```bash
serverless deploy
```

With these steps, you will have your project ready to be deployed and executed both locally and in the cloud using the Serverless framework.

---

Note: Make sure you have your AWS credentials configured correctly for a smooth deployment.

For more information and advanced configuration, see the official Serverless documentation.
