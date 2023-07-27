import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
 
@Injectable()
export class MailService {
    private transporter;
    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: configService.get<string>('SMTP_HOST'),
            port: configService.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: configService.get<string>('SMTP_USER'),
                pass: configService.get<string>('SMTP_PASS')
            }
        })
    } 

    async sendActivationMail(to, link) {
        return this.transporter.sendMail({
            from: this.configService.get<string>('SMTP_USER'),
            to,
            subject: 'Account activation'
        })
    }
}
