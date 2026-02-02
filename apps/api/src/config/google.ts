import { google } from 'googleapis';
import { env } from './env.js';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

let driveClientInstance: ReturnType<typeof google.drive> | null = null;

export const getDriveClient = () => {
  if (driveClientInstance) {
    return driveClientInstance;
  }

  if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Drive credentials not configured');
  }

  // Replace escaped newlines with actual newlines
  const privateKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  driveClientInstance = google.drive({ version: 'v3', auth });
  return driveClientInstance;
};
