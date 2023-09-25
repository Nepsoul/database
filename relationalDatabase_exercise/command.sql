-- create blog table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    url text NOT NULL,
    author text NOT NULL,
    likes integer NULL
   );

   -- select the blog table
   select * from blogs

      -- data insert into blog table
insert into blogs (title, url, author, likes) values ('Relational databases rule the world', 'https://himalayan.com', 'ram', 3);
insert into blogs (title, url, author, likes) values ('MongoDB is webscale', 'http://himalayan.com', 'sita', 8);
