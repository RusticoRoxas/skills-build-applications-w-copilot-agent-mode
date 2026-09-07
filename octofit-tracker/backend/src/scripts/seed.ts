import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ada Lovelace', email: 'ada@example.com', password: 'octofit123' },
      { name: 'Grace Hopper', email: 'grace@example.com', password: 'octofit123' },
      { name: 'Katherine Johnson', email: 'katherine@example.com', password: 'octofit123' },
    ]);

    const teams = await Team.create([
      {
        name: 'Code Sprinters',
        description: 'A team focused on consistent running and daily movement.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Orbit Walkers',
        description: 'Steady progress through walking, cycling, and strength work.',
        members: [users[2]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKilometers: 5.1, points: 80 },
      { user: users[0]._id, type: 'strength', durationMinutes: 25, points: 55 },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKilometers: 12.4, points: 95 },
      { user: users[1]._id, type: 'walking', durationMinutes: 30, distanceKilometers: 2.8, points: 45 },
      { user: users[2]._id, type: 'running', durationMinutes: 28, distanceKilometers: 4.3, points: 70 },
    ]);

    await Workout.create([
      {
        title: 'Foundation Run',
        description: 'An approachable run with a gentle warm-up and steady finish.',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        title: 'Desk Break Strength',
        description: 'A compact full-body session using bodyweight movements.',
        activityType: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 25,
      },
      {
        title: 'Endurance Ride',
        description: 'A sustained cycling workout for building aerobic capacity.',
        activityType: 'cycling',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
