const fastify = require('fastify')({ logger: true });
const cors = require('cors');

const models = require('./models');

fastify.use(cors());

fastify.get('/', (req, reply) => {
  reply.send(`Server is hooked up to Docker`);
});

// Answer Routes
fastify.get('/qa/:question_id/answers', (req, reply) => {
  const { question_id } = req.params;
  const { page, count } = req.query;

  models.answers
    .get(question_id, page, count)
    .then(data => {
      let answer_data = {
        question: question_id,
        page: parseInt(page) || 1,
        count: parseInt(count) || 5,
        results: data,
      };
      reply.code(200).send(answer_data);
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.post('/qa/:question_id/answers', (req, reply) => {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;

  models.answers
    .post(question_id, body, name, email, photos)
    .then(data => {
      reply.code(201);
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.put('/qa/answer/:answer_id/helpful', (req, reply) => {
  const { answer_id } = req.params;

  models.answers
    .helpful(answer_id)
    .then(data => {
      reply.code(204);
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.put('/qa/answer/:answer_id/report', (req, reply) => {
  const { answer_id } = req.params;

  models.answers
    .report(answer_id)
    .then(data => {
      reply.code(204);
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

// Question Routes
fastify.get('/qa/:product_id', (req, reply) => {
  const { product_id } = req.params;
  const { page, count } = req.query;

  console.time('get questions');
  models.questions
    .get(product_id, page, count)
    .then(data => {
      let question_data = {
        product_id: product_id,
        results: data,
      };
      reply.code(200).send(question_data);
      console.timeEnd('get questions');
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.post('/qa/:product_id', (req, reply) => {
  const { product_id } = req.params;
  const { body, name, email } = req.body;

  console.time('post questions');
  models.questions
    .post(product_id, body, name, email)
    .then(data => {
      reply.code(204);
      console.timeEnd('post questions');
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.put('/qa/question/:question_id/helpful', (req, reply) => {
  const { question_id } = req.params;

  console.time('helpful');
  models.questions
    .helpful(question_id)
    .then(data => {
      reply.code(204);
      console.timeEnd('helpful');
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

fastify.put('/qa/question/:question_id/report', (req, reply) => {
  const { question_id } = req.params;

  console.time('report');
  models.questions
    .report(question_id)
    .then(data => {
      reply.code(204);
      console.timeEnd('report');
    })
    .catch(err => {
      fastify.log.error(err);
      reply.code(500);
    });
});

const PORT = process.env.PORT || 4000;

fastify.listen(PORT, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
