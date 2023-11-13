CREATE OR ALTER PROCEDURE getUserByEmail(
    @email VARCHAR(300)
)
AS
BEGIN
    SELECT  user_id,
            full_name,
            email,
            phone_number,
            password
    FROM users WHERE email=@email;
END
