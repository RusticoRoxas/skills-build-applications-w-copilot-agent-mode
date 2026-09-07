import { Router } from 'express';
import { Activity, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    const users = await User.find().select('-password').populate('team', 'name');
    response.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json({ id: user.id, name: user.name, email: user.email, team: user.team });
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email'));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).sort({ recordedAt: -1 }).populate('user', 'name email'));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {};
    response.json(await Workout.find(filter).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, userId: '$_id', name: '$user.name', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;