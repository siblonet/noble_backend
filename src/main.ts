import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var whitelist = ['https://digitloop.netlify.app', 'digitloop.netlify.app'];

  const allowCors = (fn: { (req: any, res: any): void; (arg0: any, arg1: any): any; }) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

  const handler = (_req: any, res: { end: (arg0: string) => void; }) => {
    const d = new Date()
    res.end(d.toString())
  }
  app.enableCors(allowCors(handler));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
