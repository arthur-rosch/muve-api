export class ActiveNotificationError extends Error {
    constructor() {
        super('Já existe um vídeo com notificação ativa');
        this.name = 'ActiveNotificationError';
    }
}
