import { env } from '@/env';
import axios from 'axios';

interface WhatsAppOptions {
  to: string;
  templateName: string;
  languageCode: string;
  parameters: string[];
}

export async function sendWhatsAppMessage({
  to,
  templateName,
  languageCode,
  parameters,
}: WhatsAppOptions): Promise<void> {
  try {
    const numberId = env.WHATSAPP_NUMBER_ID
    const url = `https://graph.facebook.com/v12.0/${numberId}/messages`;
    const token = env.WHATSAPP_TOKEN;

    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components: [
          {
            type: 'body',
            parameters: parameters.map(param => ({ type: 'text', text: param })),
          },
        ],
      },
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Mensagem enviada:', response.data.messages[0].id);
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    throw error;
  }
}
