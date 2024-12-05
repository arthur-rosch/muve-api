"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldersRoutes = foldersRoutes;
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const verify_signature_1 = require("../../middlewares/verify-signature");
const create_folder_1 = require("./create-folder");
const delete_folder_1 = require("./delete-folder");
const get_folder_by_id_1 = require("./get-folder-by-id");
const add_favorite_folder_1 = require("./add-favorite-folder");
const get_many_folders_by_user_id_1 = require("./get-many-folders-by-user-id");
async function foldersRoutes(app) {
    app.addHook("onRequest", verify_jwt_1.verifyJwt);
    app.addHook("onRequest", verify_signature_1.checkSignatureMiddleware);
    app.post("/folder", create_folder_1.createFolder);
    app.post("/folder/favorite", add_favorite_folder_1.addFavoriteFolder);
    app.get("/folder/:folderId", get_folder_by_id_1.getFolderById);
    app.delete("/folder/:folderId", delete_folder_1.deleteFolder);
    app.get("/folder/all", get_many_folders_by_user_id_1.getManyFolderByUserId);
}
