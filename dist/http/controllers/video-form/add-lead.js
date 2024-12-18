"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadForm = createLeadForm;
const zod_1 = require("zod");
const make_add_lead_use_case_1 = require("../../../use-cases/factories/video-form/make-add-lead-use-case");
async function createLeadForm(request, reply) {
    const createLeadFormBodySchema = zod_1.z.object({
        formId: zod_1.z.string(),
        videoId: zod_1.z.string(),
        data: zod_1.z.object({
            name: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            phone: zod_1.z.string().optional(),
        }),
    });
    const { formId, videoId, data } = createLeadFormBodySchema.parse(request.body);
    try {
        const createLeadFormUseCase = (0, make_add_lead_use_case_1.makeCreateLeadFormUseCase)();
        const { leadFormVideo } = await createLeadFormUseCase.execute({
            formId,
            videoId,
            data,
        });
        return reply.status(201).send({ leadFormVideo });
    }
    catch (err) {
        reply
            .status(500)
            .send({ message: 'Unexpected error occurred', error: err });
    }
}
