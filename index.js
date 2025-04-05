import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("index.ejs");
});

app.get('/createPost', (req, res) => {
    res.render("createPost.ejs");
});

app.post('/createPost', (req, res) => {
    const { title, author, category, image, content } = req.body;

    const newPost = {
        id: blogPosts.length + 1,
        title,
        author,
        date: new Date().toDateString(),
        category,
        image: image || "/images/default.jpg",  // Use a default image if empty
        content
    };

    blogPosts.push(newPost);
    res.redirect('/viewPost');  // Redirect to view all posts after submission
});


app.get('/viewPost', (req, res) => {
    const reversedPosts = [...blogPosts].reverse();
    res.render("viewPost.ejs", { blogPosts: reversedPosts });
});

app.get('/posts/:id', (req, res) => {
    const post = blogPosts.find(p => p.id === parseInt(req.params.id));

    if (post) {
        res.render("singlePost.ejs", { post: post });
    } else {
        res.status(404).send("Post not found");
    }
});




app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});


const blogPosts = [
    {
      id: 1,
      title: "The Art of Storytelling: Captivating Your Audience",
      author: "Jane Doe",
      date: "March 20, 2025",
      content: "Storytelling is a powerful tool that connects people through emotions. Whether you're writing fiction, marketing content, or just sharing personal experiences, mastering storytelling can make all the difference...",
      category: "Writing Tips",
      image: "/images/storytelling.jpg",
    },
    {
      id: 2,
      title: "10 Productivity Hacks for Writers",
      author: "John Smith",
      date: "March 18, 2025",
      content: "Writing can be overwhelming without proper strategies. Here are 10 productivity hacks that will help you stay focused and consistent with your writing routine...",
      category: "Productivity",
      image: "/images/productivity.jpg",
    },
    {
      id: 3,
      title: "Exploring the Power of Poetry",
      author: "Emily Brown",
      date: "March 15, 2025",
      content: "Poetry is more than just words—it’s a rhythm, an emotion, a deep connection with the reader. Let’s dive into different poetry forms and how they shape our thoughts...",
      category: "Poetry",
      image: "/images/poetry.jpg",
    },
    {
      id: 4,
      title: "How to Overcome Writer's Block",
      author: "Mark Wilson",
      date: "March 10, 2025",
      content: "Writer’s block is frustrating, but it’s not impossible to overcome. From freewriting to changing your environment, here are some practical ways to beat it...",
      category: "Writing Tips",
      image: "/images/writers-block.jpg",
    },
    {
      id: 5,
      title: "The Rise of Digital Publishing",
      author: "Sarah Lee",
      date: "March 5, 2025",
      content: "Traditional publishing is evolving. With self-publishing and digital platforms on the rise, authors now have more freedom than ever before...",
      category: "Publishing",
      image: "/images/digital-publishing.jpg",
    }
  ];