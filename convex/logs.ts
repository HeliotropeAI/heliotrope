import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { LogEntry, MessageStatus } from '../src/types/messages';

const MAX_LOGS = 1000;
const CLEANUP_THRESHOLD = 800;
const STATUS_RETENTION = 50;

export const getAllLogs = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('logs')
      .withIndex('by_timestamp')
      .order('desc')
      .take(50);
  },
});

export const createLog = mutation({
  args: {
    content: v.string(),
    level: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const logEntry: LogEntry = {
      content: args.content,
      timestamp: Date.now(),
      level: (args.level as LogEntry['level']) || 'info',
      id: Math.random().toString(36).substring(7)
    };

    await ctx.db.insert('logs', logEntry);
    await cleanupOldLogs(ctx);
  },
});

export const createStatus = mutation({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const status: MessageStatus = {
      status: args.status,
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(7)
    };

    await ctx.db.insert('city_status', status);
    await cleanupOldStatuses(ctx);
  },
});

export const getAllStatus = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('city_status')
      .withIndex('by_timestamp')
      .order('desc')
      .take(STATUS_RETENTION);
  },
});

async function cleanupOldLogs(ctx) {
  const totalLogs = await ctx.db
    .query('logs')
    .withIndex('by_timestamp')
    .take(MAX_LOGS);

  if (totalLogs.length > CLEANUP_THRESHOLD) {
    const logsToDelete = await ctx.db
      .query('logs')
      .withIndex('by_timestamp')
      .order('asc')
      .take(totalLogs.length - CLEANUP_THRESHOLD);

    for (const log of logsToDelete) {
      await ctx.db.delete(log._id);
    }
  }
}

async function cleanupOldStatuses(ctx) {
  const totalStatuses = await ctx.db
    .query('city_status')
    .withIndex('by_timestamp')
    .take(STATUS_RETENTION * 2);

  if (totalStatuses.length > STATUS_RETENTION) {
    const statusesToDelete = await ctx.db
      .query('city_status')
      .withIndex('by_timestamp')
      .order('asc')
      .take(totalStatuses.length - STATUS_RETENTION);

    for (const status of statusesToDelete) {
      await ctx.db.delete(status._id);
    }
  }
}