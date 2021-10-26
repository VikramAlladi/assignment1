const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const fdate = require("date-fns");
const isValid = require("date-fns/isValid");
app.use(express.json());
const dbpath = path.join(__dirname, "todoApplication.db");
let db = null;

const initialize = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
initialize();

const ab = (each) => {
  return {
    id: each.id,
    todo: each.todo,
    priority: each.priority,
    status: each.status,
    category: each.category,
    dueDate: each.due_date,
  };
};

const middleware1 = (Request, Response, next) => {
  const { search_q, status, priority, category, date } = Request.query;
  switch (true) {
    case status !== undefined && priority !== undefined:
      if (
        !(status === "TO DO" || status === "IN PROGRESS" || status === "DONE")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Status");
      } else if (
        !(priority === "HIGH" || priority === "MEDIUM" || priority === "LOW")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Priority");
      } else {
        next();
      }
      break;
    case status !== undefined && category !== undefined:
      if (
        !(status === "TO DO" || status === "IN PROGRESS" || status === "DONE")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Status");
      } else if (
        !(category === "WORK" || category === "HOME" || category === "LEARNING")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Category");
      } else {
        next();
      }
      break;
    case category !== undefined && priority !== undefined:
      if (
        !(priority === "HIGH" || priority === "MEDIUM" || priority === "LOW")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Priority");
      } else if (
        !(category === "WORK" || category === "HOME" || category === "LEARNING")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Category");
      } else {
        next();
      }
      break;
    case status !== undefined:
      if (
        !(status === "IN PROGRESS" || status === "TO DO" || status === "DONE")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Status");
      } else {
        next();
      }
      break;
    case priority !== undefined:
      if (
        !(priority === "HIGH" || priority === "MEDIUM" || priority === "LOW")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Priority");
      } else {
        next();
      }
      break;
    case category !== undefined:
      if (
        !(category === "WORK" || category === "HOME" || category === "LEARNING")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Category");
      } else {
        next();
      }
      break;

    case date !== undefined:
      if (!isValid(new Date(dueDate))) {
        Response.status(400);
        Response.send("Invalid Due Date");
      } else {
        next();
      }
      break;
    case search_q === undefined:
      Response.status(400);
      Response.send("Invalid Todo search_q");
      break;
    default:
      next();
      break;
  }
};

const middleware2 = (Request, Response, next) => {
  const { search_q, status, priority, category } = Request.query;
  let getQuery;
  switch (true) {
    case status !== undefined && priority !== undefined:
      getQuery = `
       select * from todo where status='${status}' AND priority='${priority}';
      `;
      break;
    case status !== undefined && category !== undefined:
      getQuery = `
       select * from todo where status='${status}' AND category='${category}';
      `;
      break;
    case category !== undefined && priority !== undefined:
      getQuery = `
       select * from todo where priority='${priority}' AND category='${category}';
      `;
      break;
    case status !== undefined:
      getQuery = `
       select * from todo where status='${status}';
      `;
      break;
    case priority !== undefined:
      getQuery = `
       select * from todo where priority='${priority}';
      `;
      break;
    case category !== undefined:
      getQuery = `
       select * from todo where category='${category}';
      `;
      break;
    default:
      getQuery = `
       select * from todo where todo LIKE '${search_q}%';
      `;
      break;
  }
  Request.getQuery = getQuery;
  next();
};

const middleware3 = (Request, Response, next) => {
  const { status, priority, todo, category, dueDate } = Request.body;
  switch (true) {
    case status !== undefined:
      if (
        !(status === "IN PROGRESS" || status === "TO DO" || status === "DONE")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Status");
      } else {
        next();
      }
      break;
    case priority !== undefined:
      if (
        !(priority === "HIGH" || priority === "MEDIUM" || priority === "LOW")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Priority");
      } else {
        next();
      }
      break;
    case category !== undefined:
      if (
        !(category === "WORK" || category === "HOME" || category === "LEARNING")
      ) {
        Response.status(400);
        Response.send("Invalid Todo Category");
      } else {
        next();
      }
      break;
    case dueDate !== undefined:
      if (!isValid(new Date(dueDate))) {
        Response.status(400);
        Response.send("Invalid Due Date");
      } else {
        next();
      }
      break;
    default:
      next();
      break;
  }
};

const middleware4 = async (Request, Response, next) => {
  const { id, todo, priority, status, category, dueDate } = Request.body;
  if (!(status === "IN PROGRESS" || status === "TO DO" || status === "DONE")) {
    Response.status(400);
    Response.send("Invalid Todo Status");
  } else {
    next();
  }
};

const middleware5 = async (Request, Response, next) => {
  const { id, todo, priority, status, category, dueDate } = Request.body;
  if (!(priority === "HIGH" || priority === "MEDIUM" || priority === "LOW")) {
    Response.status(400);
    Response.send("Invalid Todo Priority");
  } else {
    next();
  }
};

const middleware6 = async (Request, Response, next) => {
  const { id, todo, priority, status, category, dueDate } = Request.body;
  if (
    !(category === "WORK" || category === "HOME" || category === "LEARNING")
  ) {
    Response.status(400);
    Response.send("Invalid Todo Category");
  } else {
    next();
  }
};

const middleware7 = async (Request, Response, next) => {
  const { id, todo, priority, status, category, dueDate } = Request.body;
  const a = new Date(dueDate);

  if (isValid(new Date(dueDate))) {
    Request.newDates = a;
    next();
  } else {
    Response.status(400);
    Response.send("Invalid Due Date");
  }
};

app.get("/todos/", middleware1, middleware2, async (Request, Response) => {
  const getQuery = Request.getQuery;
  const getArray = await db.all(getQuery);
  Response.send(getArray.map((each) => ab(each)));
});

app.get("/todos/:todoId/", async (Request, Response) => {
  const { todoId } = Request.params;
  query = `
        select * from todo where id='${todoId}';
    `;
  {
  }
  const Array = await db.get(query);
  //console.log(Array);
  Response.send(ab(Array));
});

app.get("/agenda/", async (Request, Response) => {
  const { date } = Request.query;
  const newDate = new Date(date);
  const aa = `${newDate.getFullYear()}-${("0" + (newDate.getMonth() + 1)).slice(
    -2
  )}-${("0" + newDate.getDate()).slice(-2)}`;

  if (isValid(new Date(date))) {
    const getQuery = `
        select * from todo where due_date='${aa}';
    `;
    const getArray = await db.all(getQuery);
    Response.send(getArray.map((each) => ab(each)));
  } else {
    Response.status(400);
    Response.send("Invalid Due Date");
  }
});

app.post(
  "/todos/",
  middleware5,
  middleware4,
  middleware6,
  middleware7,
  async (Request, Response) => {
    const { id, todo, priority, status, category, dueDate } = Request.body;
    const postQuery = `
        insert into todo(id,todo,priority,status,category,due_date)
        values(
            ${id},
            '${todo}',
            '${priority}',
            '${status}',
            '${category}',
            '${dueDate}'
        );
    `;
    const postArray = await db.run(postQuery);
    Response.send("Todo Successfully Added");
  }
);

app.put("/todos/:todoId/", middleware3, async (Request, Response) => {
  const { todoId } = Request.params;
  const oldQuery = `
    select * from todo where id=${todoId};
    `;
  const details = Request.body;
  let change;
  switch (true) {
    case details.status !== undefined:
      change = "Status Updated";
      break;
    case details.priority !== undefined:
      change = "Priority Updated";
      break;
    case details.todo !== undefined:
      change = "Todo Updated";
      break;
    case details.category !== undefined:
      change = "Category Updated";
      break;
    default:
      //details.dueDate !== undefined:
      change = "Due Date Updated";
      break;
  }
  const oldArray = await db.get(oldQuery);
  const {
    status = oldArray.status,
    priority = oldArray.priority,
    todo = oldArray.todo,
    category = oldArray.category,
    dueDate = oldArray.due_date,
  } = Request.body;
  const newQuery = `
     update todo set
      todo='${todo}',
      status='${status}',
      priority='${priority}',
      category='${category}',
      due_date='${dueDate}'
      where id=${todoId};
    `;
  await db.run(newQuery);
  Response.send(change);
});

app.delete("/todos/:todoId/", async (Request, Response) => {
  const { todoId } = Request.params;
  const query = `
    delete from todo where id=${todoId};
    `;
  await db.run(query);
  Response.send("Todo Deleted");
});

module.exports = app;
