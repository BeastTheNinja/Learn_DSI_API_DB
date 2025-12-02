import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { getUserProfile } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = Router();

// Authentication-only route: GET /authenticate -> returns decoded token data when token is valid
// This router is mounted under /api in src/index.ts, so the full path is /api/authenticate
router.get('/authenticate', authenticateToken, getUserProfile);

// Authorization route (role-protected): GET /authorize -> only ADMIN allowed
// Full path: /api/authorize
router.get('/authorize', authenticateToken, authorizeRole('ADMIN'), getUserProfile);

export const authRoutes = router;