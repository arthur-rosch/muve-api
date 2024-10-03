import { sendWhatsAppMessage } from "@/services/send-notifications";
import { makeCollectUsersDatasForNotificationDaily } from "@/use-cases/factories/notification/make-get-data-vsl-for-notification-daily";

async function fetchUsers() {
  const teste = makeCollectUsersDatasForNotificationDaily();
  const datasVsl = await teste.execute();
  return datasVsl.data; 
}

export default async function sendNotifications() {
  console.log('Chamando o disparo de notificações diárias');
  
  const users = await fetchUsers();
  const templateName = 'insights_vsl_1';
  const languageCode = 'pt_BR';

  for (const user of users) {
    const options = {
      to: user.to,
      templateName,
      languageCode,
      parameters: user.parameters,
    };
    try {
      await sendWhatsAppMessage(options);
      console.log(`Mensagem enviada com sucesso para ${user.to}`);
    } catch (error) {
      console.error(`Erro ao enviar a mensagem para ${user.to}:`, error);
    }
  }
}
