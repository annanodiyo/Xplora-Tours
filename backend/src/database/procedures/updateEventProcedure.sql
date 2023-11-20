CREATE OR ALTER PROCEDURE updateEvent (
    @event_id VARCHAR(500),
    @destination VARCHAR(255),
    @description VARCHAR(600),
    @duration INT,
    @price DECIMAL(10, 2),
    @start_date DATE
)
AS
BEGIN
    UPDATE events
    SET
        destination = @destination,
        description = @description,
        duration = @duration,
        price = @price,
        start_date = @start_date
    WHERE event_id = @event_id;
END;
