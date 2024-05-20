import Axios from 'axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsappApiService {
  constructor(private prisma: PrismaService) { }

  private watsap = Axios.create({
    baseURL: 'https://wapi.sentium.id/api',
    headers: {
      'X-Api-Key': 'supersecretrizalfauziwahyu',
    },
  });

  async sendMessage(phone: string, message: string, session: string = 'sistem',) {
    try {
      await this.watsap.post('/sendText', {
        chatId: `${phone.replace(/^0/, '62')}@c.us`,
        text: message,
        session: session,
      });

      return {
        status: 'OK',
      };
    } catch (err) {
      throw err;
    }
  }

  async sendMessageToAdmin(message: string, session: string = 'sistem',) {
    try {
      await this.watsap.post('/sendText', {
        chatId: `${6289602602683}@c.us`,
        text: message,
        session: session,
      });

      return {
        status: 'OK',
      };
    } catch (err) {
      throw err;
    }
  }
}
