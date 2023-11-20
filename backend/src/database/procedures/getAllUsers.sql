CREATE OR ALTER PROCEDURE fetchAllUsers
AS
BEGIN
    SELECT * FROM users where role !=  'admin' and is_Deleted != 1
END
