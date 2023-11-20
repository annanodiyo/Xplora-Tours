CREATE OR ALTER PROCEDURE deleteUser(
    @user_id VARCHAR(100))
AS
BEGIN
    update users
     set is_Deleted = 1
      where user_id = @user_id
      and is_Deleted = 0
END
