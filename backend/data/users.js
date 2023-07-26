import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@beyond.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Pete Fish",
    email: "pete@beyond.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Bob Jones",
    email: "bob@beyond.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bobby Bob",
    email: "bob@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
