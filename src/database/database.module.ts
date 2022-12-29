import { Global, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { mongo } from 'mongoose';

const API_KEY = 'HelloIAmASecret';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { mongoUrl } = configService;
        return {
          uri: mongoUrl,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}
