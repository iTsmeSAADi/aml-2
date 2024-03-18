import express from "express";
import {
  addCompany,
  changePassword,
  getAllCompanies,
  getAllInvitedUsers,
  inviteUser,
  invitedUserLogOut,
  invitedUserLogin,
  getAllUsers,
  getSpecificCompany,
  updateUser,
  deleteUser,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
const router = express.Router();
//get all companies by superAdmin
//isAuthenticated, isSuperAdmin
router.route("/").get(isAuthenticated, getAllCompanies);

router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/users/:id").patch(isAuthenticated, isSuperAdmin, updateUser);
router.route("/users/:id").delete(isAuthenticated, isSuperAdmin, deleteUser);

//add new company only by superAdmin
router.route("/:id").get(getSpecificCompany);
router.route("/addcompany").post(isAuthenticated, isSuperAdmin, addCompany);
//update and  delete company
router.route("/:id").patch(updateCompany, isAuthenticated, isSuperAdmin);
router
  .route("/company/:id")
  .delete(deleteCompany, isAuthenticated, isSuperAdmin);
//Invite User user management by superAdmin
router.route("/inviteuser").post(isAuthenticated, isSuperAdmin, inviteUser);
//login invited user( here isAuth is not for superAdmin).
router.route("/login").post(invitedUserLogin);
//change password of invited user
router.route("/changepassword").put(isAuthenticated, changePassword);
//logout invited user
router.route("/logout").get(invitedUserLogOut);
//get all invited users
router
  .route("/invitedusers")
  .get(isAuthenticated, isSuperAdmin, getAllInvitedUsers);
export default router;
