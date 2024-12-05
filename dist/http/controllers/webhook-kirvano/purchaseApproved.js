"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseApproved = purchaseApproved;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_purchase_approved_use_case_1 = require("../../../use-cases/factories/webhook-kirvano/make-purchase-approved-use-case");
async function purchaseApproved(request, reply) {
    const purchaseApprovedEventSchema = zod_1.z.object({
        event: zod_1.z.string(),
        status: zod_1.z.string(),
        payment_method: zod_1.z.string(),
        plan: zod_1.z.object({
            name: zod_1.z.string(),
            charge_frequency: zod_1.z.string(),
            next_charge_date: zod_1.z.string(),
        }),
        customer: zod_1.z.object({
            name: zod_1.z.string(),
            document: zod_1.z.string(),
            email: zod_1.z.string(),
            phone_number: zod_1.z.string(),
        }),
        type: zod_1.z.string(),
        sale_id: zod_1.z.string(),
        checkout_id: zod_1.z.string(),
        total_price: zod_1.z.string(),
        products: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string(),
            photo: zod_1.z.string().url(),
            price: zod_1.z.string(),
            offer_id: zod_1.z.string(),
            offer_name: zod_1.z.string(),
            description: zod_1.z.string(),
            is_order_bump: zod_1.z.boolean(),
        })),
    });
    const { event, plan, status, customer, sale_id, checkout_id, total_price, type, payment_method, products, } = purchaseApprovedEventSchema.parse(request.body);
    try {
        if (event === 'SALE_APPROVED') {
            console.log(products[0].offer_name);
            const purchaseApprovedUseCase = (0, make_purchase_approved_use_case_1.makePurchaseApprovedUseCase)();
            const { signature, user } = await purchaseApprovedUseCase.execute({
                status,
                name: customer.name,
                email: customer.email,
                phone: customer.phone_number,
                document: customer.document,
                password: customer.document,
                payment_method,
                price: total_price,
                plan: products[0].offer_name,
                chargeFrequency: plan.charge_frequency,
                next_charge_date: plan.next_charge_date,
                kirvano_type: type,
                kirvano_sale_id: sale_id,
                kirvano_checkout_id: checkout_id,
            });
            return reply.status(200).send({
                signature,
                user,
            });
        }
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
