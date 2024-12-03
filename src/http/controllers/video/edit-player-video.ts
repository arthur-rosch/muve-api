import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import { makeEditPlayerVideo } from '../../../use-cases/factories/video/make-edit-player-video-use-case'

export async function editPlayerVideo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const buttonSchema = z.object({
    buttonType: z.enum(['below', 'inside']),
    buttonText: z.string().nonempty(),
    buttonSize: z.string().nonempty(),
    buttonLink: z.string().url().nonempty(),
    startTime: z.string().nonempty(),
    endTime: z.string().nonempty(),
    buttonAfterTheVideoEnds: z.boolean().optional(),
    backgroundColor: z.string().nonempty(),
    textColor: z.string().nonempty(),
    hoverBackgroundColor: z.string().nonempty(),
    hoverTextColor: z.string().nonempty(),
    buttonPosition: z.string().nullable().optional(),
  })

  const chapterSchema = z.object({
    title: z.string().nonempty(),
    startTime: z.string().nonempty(),
    endTime: z.string().nonempty(),
  })

  const editPlayerParamsSchema = z.object({
    videoId: z.string(),
  })

  const editPlayerVideoBodySchema = z.object({
    name: z.string().optional(),
    format: z.enum(['9/16', '16/9']).optional(),
    thumbnail: z.string().optional(),
    color: z.string().optional(),
    colorSmartPlayers: z.string().optional(),
    playAndPause: z.boolean().optional(),
    progressBar: z.boolean().optional(),
    timeTraveled: z.boolean().optional(),
    videoDuration: z.boolean().optional(),
    volumeButton: z.boolean().optional(),
    volumeBar: z.boolean().optional(),
    speed: z.boolean().optional(),
    fullscreen: z.boolean().optional(),
    smartAutoPlay: z.boolean().optional(),
    UrlCoverSmartAutoPlay: z.string().optional(),
    TextTopSmartAutoPlay: z.string().optional(),
    TextButtonSmartAutoPlay: z.string().optional(),
    continueWatching: z.boolean().optional(),
    watchingNow: z.boolean().optional(),
    watchingNowFontSize: z.string().optional(),
    watchingNowBgColor: z.string().optional(),
    watchingNowTextColor: z.string().optional(),
    ImageVideoPause: z.boolean().optional(),
    UrlCoverImageVideoPause: z.string().optional(),
    ImageOfFinished: z.boolean().optional(),
    UrlCoverImageOfFinished: z.string().optional(),
    chapterMenu: z.boolean().optional(),
    buttonsActive: z.boolean().optional(),
    Chapter: z.array(chapterSchema).optional(),
    VideoButtons: z.array(buttonSchema).optional(),
    fictitiousProgressHeight: z.string().optional(),
    fictitiousProgress: z.boolean().optional(),
  })

  const data = editPlayerVideoBodySchema.parse(request.body)

  const { videoId } = editPlayerParamsSchema.parse(request.params)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const editPlayerVideoUseCase = makeEditPlayerVideo()

    const { Chapter, VideoButtons, ...dataEdit } = data

    const video = await editPlayerVideoUseCase.execute({
      videoId,
      userId,
      dataEdit,
      Chapters: Chapter,
      Buttons: VideoButtons,
    })

    return reply.status(200).send(video)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof AccessDeniedError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
