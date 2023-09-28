--create note table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

-- select the note table
   select * from notes

 -- data insert into note table
insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important, time) values ('MongoDB is webscale', now());

-- to delete note
drop table notes