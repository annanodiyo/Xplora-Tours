CREATE OR ALTER PROCEDURE createEvents(
    @event_id VARCHAR(500) ,
    @destination VARCHAR(255),
    @description VARCHAR(600),
    @duration INT,
    @price DECIMAL(10, 2),
    @start_date DATE

)
AS
BEGIN
insert into events (event_id, description, destination, duration,price, start_date)
values(@event_id, @description, @destination, @duration,@price, @start_date)
END
