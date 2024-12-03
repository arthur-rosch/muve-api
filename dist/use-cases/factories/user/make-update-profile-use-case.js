"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateProfileUseCase = makeUpdateProfileUseCase;
const update_profile_1 = require("../../cases/users/update-profile");
const prisma_user_repository_1 = require("../../../repositories/prisma/prisma-user-repository");
function makeUpdateProfileUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const updateProfileUseCase = new update_profile_1.UpdateProfileUseCase(usersRepository);
    return updateProfileUseCase;
}
