import { createServer } from "http";

const PORT = process.env.PORT || 9000;

const users = [
  {
    id: 1,
    name: "Nadim",
  },
  {
    id: 2,
    name: "Messi",
  },
  {
    id: 3,
    name: "Shakib",
  },
];

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// json middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// route handler for GET /api/users/:id
const getUsersByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((data) => parseInt(id) === data.id);

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User Not Found" }));
  }

  res.end();
};

// route handler
const createUserHandler = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);

    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route Not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    // if (req.url === "/api/users" && req.method === "GET") {
    //   res.setHeader("Content-Type", "application/json");
    //   res.write(JSON.stringify(users));
    //   res.end();
    // } else if (
    //   req.url.match(/\/api\/users\/([0-9]+)/) &&
    //   req.method === "GET"
    // ) {
    //   const id = req.url.split("/")[3];
    //   const user = users.find((data) => parseInt(id) === data.id);
    //   res.setHeader("Content-Type", "application/json");

    //   if (user) {
    //     //   res.setHeader("Content-Type", "application/json");
    //     res.write(JSON.stringify(user));
    //     //   res.end();
    //   } else {
    //     //   res.setHeader("Content-Type", "application/json");
    //     res.statusCode = 404;
    //     res.write(JSON.stringify({ message: "User Not Found" }));
    //     //   res.end();
    //   }
    //   res.end();
    // } else {
    //   res.setHeader("Content-Type", "application/json");
    //   res.statusCode = 404;
    //   res.write(JSON.stringify({ message: "Route Not Found" }));
    //   res.end();
    // }

    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res, () => {});
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUsersByIdHandler(req, res, () => {});
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res, () => {});
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server2 running on port ${PORT}`);
});
