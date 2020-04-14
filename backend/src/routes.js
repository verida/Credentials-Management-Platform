import express from 'express';
import AdminController from 'controllers/admin';

// etc.

const router = express.Router();

router.post('/admin/create', AdminController.create);
router.get('/admin/view', AdminController.view);
router.get('/admin/list', AdminController.list);
router.post('/admin/update', AdminController.update);
router.get('/admin/login', AdminController.login);

// ... add CRUD for credential, issuer, patient, user

export default router;