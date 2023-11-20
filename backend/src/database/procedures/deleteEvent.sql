CREATE OR ALTER PROCEDURE deleteEvent(
    @event_id VARCHAR(100))
AS
BEGIN
    update events
     set is_Deleted = 1
      where event_id = @event_id
      and is_Deleted = 0
END
