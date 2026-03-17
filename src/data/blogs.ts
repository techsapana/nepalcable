export interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Top 10 Tips for Learning Web Development",
    slug: "top-10-tips-for-learning-web-development",
    author: "John Doe",
    date: "February 1, 2026",
    category: "Development",
    image: "/blogs/webdev-tips.svg",
    content: `
Learning web development can seem overwhelming at first. Here are 10 tips to get you started: 

1. Start with HTML, CSS, and JavaScript fundamentals.
2. Build small projects daily.
3. Practice problem-solving using online challenges.
4. Learn version control with Git.
5. Explore frontend frameworks like React.
6. Learn backend basics with Node.js.
7. Understand databases (SQL & NoSQL).
8. Join developer communities.
9. Keep up with tech blogs & YouTube channels.
10. Never stop experimenting and building projects!
    `,
  },
  {
    id: 2,
    title: "Why Data Science is the Career of the Future",
    slug: "why-data-science-is-the-career-of-the-future",
    author: "Jane Smith",
    date: "January 25, 2026",
    category: "Data",
    image: "/blogs/data-science.svg",
    content: `
Data Science is transforming industries by enabling smarter decision-making.
The demand for data scientists has increased exponentially. If you're thinking about a career in tech, data science is one of the most promising fields.
Key skills include Python, R, SQL, Machine Learning, and Data Visualization.
    `,
  },
  {
    id: 3,
    title: "UI/UX Design Principles Every Beginner Should Know",
    slug: "ui-ux-design-principles-every-beginner-should-know",
    author: "Alex Johnson",
    date: "February 3, 2026",
    category: "Design",
    image: "/blogs/uiux.svg",
    content: `
UI/UX design is about creating user-friendly and visually appealing applications. Key principles:

- Keep it simple and intuitive.
- Prioritize user needs.
- Maintain consistency.
- Use visual hierarchy effectively.
- Test designs with real users.
    `,
  },
];
