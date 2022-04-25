# CloudFormation

- Its an alternative for Terraform which supports only AWS.

## Concepts

### Template

- YAML or JSON file which define resources

### Stack

- Grouping of related resources as single unit as stack.
- We can create, update and delete entire stack at a time.

### Change sets

- When we make changes to running resources, we update the stack. Before making the change, we can generate a change set, **which summary of your proposed changes. Change sets allow you to see how your changes might impact your running resources, especially for critical resources, before implementing them.

## Syntax of anatomy of cloudformation template

[ANATOMY](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html)