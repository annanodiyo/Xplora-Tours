CREATE TABLE events (
    event_id VARCHAR(500) PRIMARY KEY ,
    destination VARCHAR(255) NOT NULL,
    description varchar (600) not null,
    duration INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_Deleted BIT DEFAULT 0

);


ALTER TABLE events
ADD start_date DATE;

select * from events

drop table events
