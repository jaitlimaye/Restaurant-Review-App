import express from "express";
import resCtrl from "./res_controller.js"
import revCtrl from "./rev_controller.js"

const router = express.Router();

router.route("/").get(resCtrl.apiGetRes);
router.route("/id/:id").get(resCtrl.apiGetRes_id);
router.route("/cuisines").get(resCtrl.apiGetRes_cuisine);


router.route("/reviews")
    .post(revCtrl.apiGetRev)
    .put(revCtrl.apiPutRev)
    .delete(revCtrl.apiDelRev)
export default router
