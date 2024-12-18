"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = videosRoutes;
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const create_1 = require("./create");
const delete_1 = require("./delete");
const get_video_by_id_1 = require("./get-video-by-id");
const edit_player_video_1 = require("./edit-player-video");
const get_many_videos_by_user_id_1 = require("./get-many-videos-by-user-id");
const get_many_videos_not_folder_id_1 = require("./get-many-videos-not-folder-id");
const verify_signature_1 = __importDefault(require("../../middlewares/verify-signature"));
const verify_limit_1 = __importDefault(require("../../middlewares/verify-limit"));
const edit_folderId_video_1 = require("./edit-folderId-video");
const get_many_videos_containt_form_by_user_id_1 = require("./get-many-videos-containt-form-by-user-id");
async function videosRoutes(app) {
    app.get('/video/:videoId', get_video_by_id_1.getVideoById);
    app.post('/video', {
        onRequest: [
            verify_jwt_1.verifyJwt,
            verify_signature_1.default,
            verify_limit_1.default,
        ],
    }, create_1.createVideo);
    app.post('/edit/player/video/:videoId', {
        onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default],
    }, edit_player_video_1.editPlayerVideo);
    app.get('/video/not/folder', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, get_many_videos_not_folder_id_1.getManyVideoNotFolderId);
    app.delete('/video/:videoId', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, delete_1.deleteVideo);
    app.post('/edit/folder/video', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, edit_folderId_video_1.editFolderIdVideo);
    app.get('/video/all', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, get_many_videos_by_user_id_1.getManyVideoByUserId);
    app.get('/video/form', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, get_many_videos_containt_form_by_user_id_1.getManyVideoContainFormByUserId);
}
