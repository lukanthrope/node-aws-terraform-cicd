provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = var.main_vpc_cidr_block

  tags = {
    Name = "main"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.private_subnet_cidr_block

  tags = {
    Name = "Main"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.public_subnet_cidr_block

  tags = {
    Name = "Main"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "main"
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = var.main_vpc_cidr_block
  }

  tags = {
    Name = "main"
  }
}

resource "aws_route_table_association" "public_rt_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_rt_assoc" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_security_group" "app_sg" {
  name        = "HTTP"
  description = "Allow http traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "http public"
  }
}

resource "aws_security_group" "db_sg" {
  name        = "Database"
  description = "Allow database traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app_sg.id]
  }

  tags = {
    Name = "database"
  }
}

resource "aws_instance" "node_api" {
  ami           = var.api_instance_ami
  instance_type = var.api_instance_type

  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "Main-Node-API"
  }
}

resource "aws_db_subnet_group" "database" {
  name       = "my-test-database-subnet-group"
  subnet_ids = [aws_subnet.private.id]
}

resource "aws_db_instance" "db_main" {
  allocated_storage   = 20
  db_name             = "postgres"
  engine              = "postgres"
  engine_version      = "15.4-R3"
  instance_class      = "db.t3.micro"
  username            = var.db_username
  password            = var.db_password
  skip_final_snapshot = true

  db_subnet_group_name   = aws_db_subnet_group.database.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
}
