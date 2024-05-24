import { ProductTransactionService } from '@/domain/transaction/product-transaction/product-transaction.service';
import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { TestingWapiDto } from './dto';

@Injectable()
export class WhatsappApiService {
  constructor(
    private transactionProductService: ProductTransactionService,
  ) { }

  private watsap = Axios.create({
    baseURL: 'https://wapi.sentium.id/api',
    headers: {
      'X-Api-Key': 'supersecretrizalfauziwahyu',
    },
  });

  async sendMessageToAdmin(phoneNumber: string = `089602602683`, message: string, session: string = 'sistem',) {
    try {
      await this.watsap.post('/sendText', {
        chatId: `${phoneNumber.replace(/^0/, '62')}@c.us`,
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

  async sendMessageToAdminOutletWithNoTransactionsPast3Days(whatsappNumber: string) {
    try {
      const outlets = await this.transactionProductService.getAllOutletWithNoTransactionsPastThreeDays()
      const outletAlertMsg = this.transactionProductService.generateTextAlertForOutletWithNoTransactionsPastThreeDays(outlets)
      await this.sendMessageToAdmin(whatsappNumber, outletAlertMsg)
    } catch (error) {
      console.error(error.message)
    }
  }
}
