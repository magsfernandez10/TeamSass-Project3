const router = require("express").Router();
const activitiesController = require("../../controllers/activitiesController");

// Matches with "/api2/activity"
router.route("/activity")
  .get(activitiesController.findAll)
  .post(activitiesController.create);

// Matches with "/api2/activity/:id"
// router.route("/activity/:id")
//   .get(activitiesController.findById)
//   .put(activitiesController.update)
//   .delete(activitiesController.remove);

module.exports = router;