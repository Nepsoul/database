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

-- to delete one specific note form table
delete from notes where id = 2

--to insert data into team and to show many-to-many relationship, memberships through table
insert into teams (name) values ('toska');
insert into teams (name) values ('mosa climbers');
insert into memberships (user_id, team_id) values (1, 1);
insert into memberships (user_id, team_id) values (1, 2);
insert into memberships (user_id, team_id) values (2, 1);
insert into memberships (user_id, team_id) values (3, 2);

--to insert data in through table, showing many-to-many relationship betn user and note
insert into user_notes (user_id, note_id) values (1, 4);
insert into user_notes (user_id, note_id) values (1, 5);

--for update
update users
set disabled=FALSE
where id=1