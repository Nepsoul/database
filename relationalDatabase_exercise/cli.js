const blogs = [
  { author: "Dan Abramov", title: "On let vs const", likes: 0 },
  {
    author: "Laurenz Albe",
    title: "Gaps in sequences in PostgreSQL",
    likes: 0,
  },
];

//to print blog in terminal
function showBlogs() {
  blogs.forEach((blog) => {
    console.log(`${blog.author}:'${blog.title}',${blog.likes} likes`); //node cli.js, to display the blog
  });
}

//call function to display the blogs
showBlogs();
