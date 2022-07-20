const express = require('express');
const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: 'front-end' },
    { id: 2, title: 'devops' },
    { id: 3, title: 'back-end' },
    { id: 4, title: 'react' },
  ],
};

app.get('/', (req: any, res: any) => res.send({ message: 'Hello World!!!' }));
app.get('/courses', (req: any, res: any) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter((course) =>
      course.title.includes(req.query.title)
    );
  }

  res.json(foundCourses);
});
app.post('/courses', (req: any, res: any) => {
  const newCourse = {
    id: db.courses.length + 1,
    title: req.body.title,
  };
  db.courses.push(newCourse);

  res.status(201).json(newCourse);
});

app.get('/courses/:id', (req: any, res: any) => {
  const findCourse = db.courses.find((course) => course.id === +req.params.id);

  if (!findCourse) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }
  res.json(findCourse);
});

app.delete('/courses/:id', (req: any, res: any) => {
  db.courses = db.courses.filter((course) => course.id !== +req.params.id);

  res.sendStatus(204);
});

// app.get('/sa', (req: any, res: any) => {
//   console.log(req);
//   res.send('Hello SA');
// });
// app.post('/sa', (req: any, res: any) => res.send('Create SA'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
