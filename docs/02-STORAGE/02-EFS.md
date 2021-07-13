# EFS

- Fully managed, durable.
- Highliy availabe: built-in protection form AZ outages and other failures.
- Provide NFS for linux based EC2 instance.
- Multiple system can connect to same NFS system at the same time.
- Comes with two different storage class:
  - Standard
  - Infrequent access
- Also has lifecycle management, where we can define lifecycle of data, where data will be moved ot "infrequent" storage class automatically after 7, 14, 30, 60 or 90 days.
- Automatically expands and shrinks, so as data(files) grows, EFS grows automatically, minimizing disk management activity.
- Encryption is enalbed by default.
