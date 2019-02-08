const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "photo-upload-backend-dev-attachmentsbucket-1i8nv75ph2yhx"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://bwuvkdw9nh.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_XCHtfzX8f",
    APP_CLIENT_ID: "4dpkq27u8ta9cc3bimb49ll3f1",
    IDENTITY_POOL_ID: "us-east-1:daf3f2b1-80df-4384-a853-b82bad5f06a9"
  },
  cloudFront: {
    URL: "https://d2tcvelh1961gb.cloudfront.net/"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "photo-upload-backend-prod-attachmentsbucket-3j4dy29wfqpn"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://2kc44a3aii.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_5glRWldYU",
    APP_CLIENT_ID: "66pb3c8j6uv3hqnu9ulai6lnfa",
    IDENTITY_POOL_ID: "us-east-1:bace0f77-9150-495b-b186-3ad92f77d40c"
  },
  cloudFront: {
    URL: "dbtk1jpf7jtg3.cloudfront.net"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...config
};
