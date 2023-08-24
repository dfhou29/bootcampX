const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM assistance_requests
         JOIN teachers ON teacher_id = teachers.id
         JOIN students ON student_id = students.id
         JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
  ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(result => {
      console.log(`${result.cohort}: ${result.teacher}`);
    });
  })
  .catch(err => {
    console.err('query error', err.stack);
  });