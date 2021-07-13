# Amazon MQ

- Managed message broker service.
- Supports Apache ActiveMQ and RabbitMQ

## Different between Amazon MQ or Amazon SQS or SNS

- SQS and SNS are queue and topic services, simple to use and are recommended for new application.
- Amazon MQ message broker that provides compatibility with many popular message brokers. Hence this can be easily used with existing application.

## RabbitMQ

SINGLE INSTANCE DEPLOYMENT

![Architecture of single instance broker RabbitMQ](https://github.com/iAbhishek91/aws-as-code/blob/master/docs/.images/amazon-mq-rabbitmq-broker-architecture-single-broker.png)

CLUSTER DEPLOYMENT

![Architecture of cluster broker RabbitMQ](https://github.com/iAbhishek91/aws-as-code/blob/master/docs/.images/amazon-mq-rabbitmq-broker-architecture-cluster-broker.png)

### Broker

- They are basic building block of Amazon MQ.
- Currently supports m5 and t3 with size large and micro
- broker can be deployed as *single-instance type* or *cluster deployments*.
- both type AmazonMQ broker communicates with EBS volume under the hood.
- both type sits behind a network load balancer.
- broker listen at specific port:
  - 5671 used by application to connect to brokers
  - 443 and 15671 used by RabbitMQ or Management API to connect to brokers
- broker has specific attributes: *name*, *ID*, *ARN*, *RabbitMQ*, *secure AMQP endpoint* etc.

### How to decide the instance type and size of the broker

It totally depends on *message-size* and *message-queue*.

As per AWS, for 5KB(average message size) refer the below table [@](https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/rabbitmq-defaults.html)

