import { getCookie } from './cookie';
import { DIMENSION_ID, COOKIE_NAME, defaultUser, defaultTournament } from '../configs';
/**
 * Get current stored token
 */
export const getToken = () => {
  return getCookie(COOKIE_NAME);
}