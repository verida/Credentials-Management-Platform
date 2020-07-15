npm run build
aws s3 sync dist s3://cm.testnet.verida.health --profile verida-testnet --delete
aws cloudfront create-invalidation --distribution-id E63GZ6NQ8COEF --profile verida-testnet --paths "/*"