import Framework from './Framework';

const app = new Framework();

app
  .use(async (context, next) => {
    console.log('a start');
    await next();
    console.log('a end');
  })
  .use(async (context, next) => {
    console.log('b start');
    await next();
    console.log('b end');
  });

app.listen(3000);
