# Key Pair

- Key pair exists can be attached with EC2 instance. It's created with in AWS.
- Also optionally we can upload existing ssh key in aws. however it's not recommended.

- SSh key are based on different standard you use
  - Openssh: pem
  - putty: putty

- outputs the same as returned from createKeyPair.

- By default it will be (-rw-------), 400 (-r--------) is required `chmod 400 a.pem`. Write permission will throw error as write permission is given to the file.

- Command to connect a EC2 instance.
  - ssh -i ~/.ssh/id_rsa_aws 32.32.32.32
