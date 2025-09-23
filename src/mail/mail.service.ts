import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get('SMTP_HOST'),
      port: Number(config.get('SMTP_PORT') || 587),
      auth: {
        user: config.get('SMTP_USER'),
        pass: config.get('SMTP_PASS'),
      }
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: this.config.get('MAIL_FROM'),
        to,
        subject,
        text
      });
      this.logger.log(`Mail sent: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error('Error sending mail', err);
      throw err;
    }
  }
}
