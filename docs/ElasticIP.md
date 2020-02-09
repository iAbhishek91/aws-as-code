# Elastic IP

- They are public IP, generally a public IP is assigned to your instance. However they changes, on stopping.
- Elastic IP are fixed public IP.
- AWS only provide max of 5 elastic IP address. Else we need to request AWS separately.
- Elastic IP are charged separately.
- In short its better to avoid elastic IP, its very poor architecture decision.
- Their other strategies, like DNS with random public IP address, or load balancers.
