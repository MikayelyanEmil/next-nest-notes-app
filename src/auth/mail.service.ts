import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService { 
    async sendActivationMail(to, link) {
        return 3333;
    }
}
