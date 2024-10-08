import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, VideosRepository } from '@/repositories'

interface GetDatasForVslUseCaseResponse {
  data: {
    to: string,
    parameters: string[]
  }[]
}

export class GetDatasForVslUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videosRepository: VideosRepository,
  ) {}

  async execute(): Promise<GetDatasForVslUseCaseResponse> {

    const users = await this.usersRepository.findUsersWithFlagReceiveNotificationsTrue()

    if (!users || users.length === 0) {
      throw new NotFoundErros('Nenhum usuário com notificações ativas encontrado');
    }

    const userIds = users.map(user => user.id);
    const userMap = new Map(users.map(user => [user.id, user.phone]));

    const videos = await this.videosRepository.findVideosWithReceiveNotificationByIds(userIds)

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const videoData = await Promise.all(videos.map(async (video) => {
      const uniqueViewsToday = video.analytics.viewUnique.filter(view => {
        const viewDate = new Date(view.created_at);
        return viewDate >= today && viewDate <= endOfDay;
      }).length;

      const totalViewsToday = video.analytics.viewTimestamps.filter(view => {
        const viewDate = new Date(view.created_at);
        return viewDate >= today && viewDate <= endOfDay;
      }).length;

      const totalViewsYesterday = video.analytics.viewTimestamps.filter(view => {
        const viewDate = new Date(view.created_at);
        return viewDate >= yesterday && viewDate <= endOfYesterday;
      }).length;

      const totalViewTimeToday = video.analytics.viewTimestamps
        .filter(view => {
          const viewDate = new Date(view.created_at);
          return viewDate >= today && viewDate <= endOfDay;
        })
        .reduce((acc, view) => acc + (view.endTimestamp - view.startTimestamp), 0);

      const averageViewTimeToday = uniqueViewsToday > 0 ? totalViewTimeToday / uniqueViewsToday : 0;

      const improvementComparedToYesterday = totalViewsYesterday > 0 ? 
        (((totalViewsToday - totalViewsYesterday) / totalViewsYesterday) * 100).toFixed(2) : '0';

      return {
        to: userMap.get(video.userId) || '',
        parameters: [
          uniqueViewsToday.toString(),
          totalViewsToday.toString(),
          averageViewTimeToday.toFixed(2).toString(),
          improvementComparedToYesterday
        ]
      };
    }));

    return {
      data: videoData,
    }
  }
}
