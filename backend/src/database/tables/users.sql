CREATE TABLE users (
    user_id VARCHAR(500) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) NOT NULL
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    status  VARCHAR (100) NOT NULL DEFAULT "Active"
)
-- Add a new column 'NewColumnName' to table 'TableName' in schema 'SchemaName'
ALTER TABLE SchemaName.TableName
    ADD NewColumnName /*new_column_name*/ int /*new_column_datatype*/ NULL /*new_column_nullability*/
GO
