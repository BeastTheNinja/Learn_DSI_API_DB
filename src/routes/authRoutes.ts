import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getUserProfile } from '../controllers/authController.js';

const router = Router();

// GET /authenticate -> returns decoded token data when token is valid
// This route is mounted in src/index.ts as app.use('/authenticate', authRoutes)
router.get('/authenticate', authenticateToken, getUserProfile);

export const authRoutes = router;