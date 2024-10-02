import axios from 'axios';

interface WhatsAppOptions {
  to: string;
  authCode: string;
}

export async function sendAuthCode({
  to,
  authCode,
}: WhatsAppOptions): Promise<void> {
  try {
    const url = 'https://graph.facebook.com/v12.0//messages';
    const token = '';

    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: 'autenticacao_telefone',
        language: {
          code: 'pt_BR',
        },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: authCode }
            ]
          },
          {
            type: 'button',
            sub_type: 'URL',
            index: '0',
            parameters: [
              { type: 'text', text: 'Teste' }
            ]
          }
        ]
      }
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Mensagem enviada:', response.data.messages[0].id);
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error.response?.data || error.message);
    throw error;
  }
}
