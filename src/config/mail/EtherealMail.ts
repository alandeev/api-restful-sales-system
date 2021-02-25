import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';

import HandlebarsMailTemplate, { IParseMailTemplate } from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject || 'Recuperação de senha',
      html: await mailTemplate.parse(templateData),
    });

    console.log("Message sent: %s", message.message);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
