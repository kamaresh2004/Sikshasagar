import { createServer } from 'http';
import express from 'express';
import cors from 'cors';

import { config } from './lib/config.js';
import { connectDb } from './lib/db.js';
import { initRealtime } from './lib/realtime.js';

import { authRoutes } from './routes/auth.js';
import { studentRoutes, classRoutes } from './routes/students.js';
import { attendanceRoutes } from './routes/attendance.js';
import { performanceRoutes } from './routes/performance.js';
import { learningRoutes } from './routes/learning.js';
import { galleryRoutes } from './routes/gallery.js';
import { announcementRoutes } from './routes/announcements.js';
import { notificationRoutes } from './routes/notifications.js';
import { enquiryRoutes } from './routes/enquiries.js';
import { feeRoutes } from './routes/fees.js';
import { eventRoutes } from './routes/events.js';
import { leaveRoutes } from './routes/leave.js';
import { aiRoutes } from './routes/ai.js';

const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'sikshasagar-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api', learningRoutes); // /api/activities, /api/homework
app.use('/api/gallery', galleryRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/ai', aiRoutes);

// 404 + error handler
app.use((req, res) => res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.path}` }));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[error]', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

async function main() {
  await connectDb();
  const httpServer = createServer(app);
  initRealtime(httpServer);
  httpServer.listen(config.port, () => {
    console.log(`[api] listening on http://localhost:${config.port}`);
    console.log(`[ws]  Socket.IO ready on the same port`);
  });
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});