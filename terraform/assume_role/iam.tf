locals {
  iam_path = "/system/"
  tags = {
    "scope" = "abhishek"
  }
}

// create an IAM group
resource "aws_iam_group" "viewer" {
  name = "viewer"
  path = local.iam_path
}

// create IAM user
resource "aws_iam_user" "abhishek" {
  name = "abhishek"
  path = local.iam_path
  tags = local.tags
  depends_on = [
    aws_iam_group.viewer
  ]
}

// add above user to group
resource "aws_iam_user_group_membership" "abhishek_viewer" {
  user   = aws_iam_user.abhishek.name
  groups = [aws_iam_group.viewer.name]
}

// create a user managed IAM policy
resource "aws_iam_policy" "viewer" {
  name        = "ViewerForEC2IAMAssumeRole"
  path        = local.iam_path
  description = "Custom policy to view EC2 and IAM instance"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ec2:Describe*",
          "iam:List*",
          "sts:AssumeRole"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

// attach the above policy and group
resource "aws_iam_group_policy_attachment" "abhishek_viewer" {
  group      = aws_iam_group.viewer.name
  policy_arn = aws_iam_policy.viewer.arn
}

// fetch the group details
data "aws_iam_group" "viewer" {
  group_name = aws_iam_group.viewer.name
}


output "assume_role" {
  value = {
    user = {
      name      = aws_iam_user.abhishek.name
      arn       = aws_iam_user.abhishek.arn
      unique_id = aws_iam_user.abhishek.unique_id
    }
    group = {
      name          = aws_iam_group.viewer.name
      arn           = aws_iam_group.viewer.arn
      user-attached = data.aws_iam_group.viewer.users
    }
    role = {
      name = aws_iam_policy.viewer.name
      arn  = aws_iam_policy.viewer.arn
      id   = aws_iam_policy.viewer.id
    }

  }
}