import { mutation, query, action } from './_generated/server';
import { v } from 'convex/values';
import axios from 'axios';
import { api } from '../convex/_generated/api';
export const getAllLogs = query({
  handler: async (ctx) => {
    // return await ctx.db.query('logs').withIndex('by_timestamp').order('desc').take(50);
  },
});

export const createLog = mutation({
  args: {
    content: v.string(),
  },
  handler: (ctx, args) => {
    const { content } = args;

    // ctx.db.insert('logs', { content, timestamp: Date.now() });
  },
});

export const deleteLog = mutation({
  handler: (ctx) => {
    ctx.db
      .query('logs')
      .withIndex('by_timestamp')
      .take(300)
      .then((totalLogs) => {
        // if (totalLogs.length > 200) {
        //   ctx.db
        //     .query('logs')
        //     .withIndex('by_timestamp')
        //     .order('asc')
        //     .take(100)
        //     .then((logsToDelete) => {
        //       for (const log of logsToDelete) {
        //         ctx.db.delete(log._id);
        //       }
        //     });
        // }
      })
      .catch((error) => {
        console.error('خطا در حذف لاگ‌ها:', error);
      });
  },
});

export const get20Logsformatted = query({
  handler: async (ctx) => {
    // const recentLogs = await ctx.db.query('logs').withIndex('by_timestamp').order('desc').take(50);    
    // return recentLogs;
  },
});

export const createStatus= mutation({
  args: {
    status: v.string(),
  },
  handler: (ctx, args) => {
    const { status } = args;

    // ctx.db.insert('city_status', { status, timestamp: Date.now() });
  },
});

export const deleteStatus = mutation({
  handler: (ctx) => {
    ctx.db
      .query('city_status')
      .withIndex('by_timestamp')
      .take(300)
      .then((totalLogs) => {
        // if (totalLogs.length > 200) {
        //   ctx.db
        //     .query('city_status')
        //     .withIndex('by_timestamp')
        //     .order('asc')
        //     .take(100)
        //     .then((logsToDelete) => {
        //       for (const log of logsToDelete) {
        //         ctx.db.delete(log._id);
        //       }
        //     });
        // }
      })
      .catch((error) => {
        console.error('خطا در حذف لاگ‌ها:', error);
      });
  },
});

export const getAllStatus = query({
  handler: async (ctx) => {
    // return await ctx.db.query('city_status').withIndex('by_timestamp').order('desc').take(50);
  },
});