// create s3 admin role and trust abhishek user
resource "aws_iam_role" "assume_s3_viewer" {
  name = "assume_s3_viewer"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = aws_iam_user.abhishek.arn
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "assume_s3_Readonly" {
  role = aws_iam_role.assume_s3_viewer.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}


output "role" {
  value = {
    role = {
      name = aws_iam_role.assume_s3_viewer.name
      arn  = aws_iam_role.assume_s3_viewer.arn
    }
  }
}