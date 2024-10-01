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
    const url = 'https://graph.facebook.com/v12.0/419604997907029/messages';
    const token = 'EAAYad9C7UDYBO0IztJFGbo9aCyRZCqfVQe2tm86q5WPX3ZBFk7eZAuZA4suB1iZCqckVVfeoLVWVcFp4d9f0QlAsJjhNLpHOAARUQA6lCKWV2emqGQ2u2m8ZC6Ci7D93SNAlVQ8NGcWygF9quH7ZB4DE1fNB52yDuaZCfmcIuZA6vaiZC1xg3kcnssmvRtEfUHS892heEYk4T8DJCLpkYNrkmjXNR3sx8c';

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
