
CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @full_name VARCHAR(200),
    @email VARCHAR(300),
    @phone_number VARCHAR(20),
    @password VARCHAR(200)
)
AS
BEGIN
    DECLARE @role VARCHAR(50);

    IF NOT EXISTS (SELECT 1 FROM users)
    BEGIN

        SET @role = 'Admin';
    END
    ELSE
    BEGIN

        SET @role = 'User';
    END

    INSERT INTO users(user_id, full_name, email, phone_number, password, role)
    VALUES(@user_id, @full_name, @email, @phone_number, @password, @role)
END
 delete from users
