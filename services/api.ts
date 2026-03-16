import {mockDb} from './mockDb';

// All API calls are fully mocked — no real backend dependency
export async function apiRequest(
  path: string,
  options: RequestInit & {getAuthHeaders?: () => Record<string, string>} = {},
) {
  const bodyParams = options.body ? JSON.parse(options.body as string) : {};

  try {
    // ─── Auth ───────────────────────────────────────────────────────────
    if (path === '/login') {
      const result = await mockDb.login(
        bodyParams.emailId || bodyParams.email,
        bodyParams.password,
      );
      if (result) {
        return {status: 'success', user: result.user, token: result.token};
      }
      // Fallback: accept any credentials for demo
      return {
        status: 'success',
        token: `mock_jwt_${Date.now()}`,
        user: {
          _id: 'guest',
          fullName: bodyParams.emailId?.split('@')[0] || 'User',
          emailId: bodyParams.emailId || 'user@pawmantra.com',
        },
      };
    }

    if (path === '/addUser' || path === '/signup') {
      const existing = await mockDb.getUserByEmail(bodyParams.emailId);
      if (existing) {
        return {status: 'error', message: 'Email already registered'};
      }
      const newUser = await mockDb.addUser({
        fullName: bodyParams.name || bodyParams.fullName,
        emailId: bodyParams.emailId,
        contactNumber: bodyParams.contactNumber || '',
        password: bodyParams.password,
      });
      return {status: 'success', user: newUser};
    }

    if (path === '/getUser') {
      const user = await mockDb.getUser(bodyParams.userId);
      if (user) {
        return {status: 'success', users: [user]};
      }
      return {status: 'error', message: 'User not found'};
    }

    if (path === '/updateUser') {
      const updated = await mockDb.updateUser(
        bodyParams.userId || bodyParams._id,
        {
          fullName: bodyParams.fullName,
          contactNumber: bodyParams.contactNumber,
          userImg: bodyParams.userImg,
        },
      );
      if (updated) {
        return {status: 'success', user: updated};
      }
      return {status: 'error', message: 'User not found'};
    }

    // ─── Pets ───────────────────────────────────────────────────────────
    if (path === '/getPetsByUser') {
      const pets = await mockDb.getPetsByUser(bodyParams.userId);
      return {status: 'success', pets};
    }

    if (path === '/addPet') {
      const newPet = await mockDb.addPet(bodyParams);
      return {status: 'success', pet: newPet};
    }

    if (path === '/deletePet') {
      const deleted = await mockDb.deletePet(bodyParams.petId);
      return {
        status: deleted ? 'success' : 'error',
        message: deleted ? 'Pet deleted' : 'Pet not found',
      };
    }

    // ─── Reminders ──────────────────────────────────────────────────────
    if (path === '/getReminders') {
      const reminders = await mockDb.getRemindersByUser(bodyParams.userId);
      return {status: 'success', reminders};
    }

    if (path === '/addReminder') {
      const newReminder = await mockDb.addReminder(bodyParams);
      return {status: 'success', reminder: newReminder};
    }

    if (path === '/deleteReminder') {
      const deleted = await mockDb.deleteReminder(bodyParams.reminderId);
      return {status: deleted ? 'success' : 'error'};
    }

    // ─── Service Providers ──────────────────────────────────────────────
    if (path === '/getWalkers') {
      const walkers = await mockDb.getWalkers();
      return {status: 'success', walkers};
    }

    if (path === '/getGroomers') {
      const groomers = await mockDb.getGroomers();
      return {status: 'success', groomers};
    }

    if (path === '/getBoardings') {
      const boardings = await mockDb.getBoardings();
      return {status: 'success', boardings};
    }

    if (path === '/getVets') {
      const vets = await mockDb.getVets();
      return {status: 'success', vets};
    }

    // ─── Bookings ───────────────────────────────────────────────────────
    if (path === '/addBooking') {
      const newBooking = await mockDb.addBooking({
        ...bodyParams,
        status: bodyParams.status || 'upcoming',
      });
      return {status: 'success', booking: newBooking};
    }

    if (path === '/getBookingsByUser') {
      const bookings = await mockDb.getBookingsByUser(bodyParams.userId);
      return {status: 'success', bookings};
    }

    // ─── Community ──────────────────────────────────────────────────────
    if (path === '/getPosts') {
      const posts = await mockDb.getPosts();
      return {status: 'success', posts};
    }

    if (path === '/addPost') {
      const newPost = await mockDb.addPost(bodyParams);
      return {status: 'success', post: newPost};
    }

    if (path === '/toggleLike') {
      const post = await mockDb.toggleLike(
        bodyParams.postId,
        bodyParams.userId,
      );
      return {status: post ? 'success' : 'error', post};
    }

    // ─── Notifications ──────────────────────────────────────────────────
    if (path === '/getNotifications') {
      const notifications = await mockDb.getNotificationsByUser(
        bodyParams.userId,
      );
      return {status: 'success', notifications};
    }

    if (path === '/markNotificationRead') {
      const ok = await mockDb.markNotificationRead(bodyParams.notificationId);
      return {status: ok ? 'success' : 'error'};
    }
  } catch (err) {
    console.error(`Mock API Error at ${path}:`, err);
    throw err;
  }

  // Fallback for any unhandled route
  console.warn(`Unhandled mock route: ${path}`);
  return {status: 'error', message: `Route ${path} not implemented`};
}
