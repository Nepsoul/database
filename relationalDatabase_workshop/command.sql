--create note table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

-- select the blog table
   select * from notes

 -- data insert into blog table
insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);

-- to delete blog
drop table notes