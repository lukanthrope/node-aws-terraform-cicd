variable "main_vpc_cidr_block" {
  type        = string
  description = "main vpc cidr block"
}

variable "public_subnet_cidr_block" {
  type        = string
  description = "public subnet cidr block"
}

variable "private_subnet_cidr_block" {
  type        = string
  description = "private subnet cidr block"
}

variable "api_instance_name" {
  type        = string
  description = "Node api EC2 instance name"
}

variable "api_instance_type" {
  type        = string
  description = "Node api EC2 instance type"
}

variable "api_instance_ami" {
  type        = string
  description = "Node api EC2 AMI"
}

variable "db_username" {
  type = string
}
variable "db_password" {
  type = string
}
