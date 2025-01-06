import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { agentTables } from './agent/schema';
import { heliotropeTables } from './heliotrope/schema';
import { conversationId, playerId } from './heliotrope/ids';
import { engineTables } from './engine/schema';

export default defineSchema({
  music: defineTable({
    storageId: v.string(),
    type: v.union(v.literal('background'), v.literal('player')),
  }),

  logs: defineTable({
    content: v.string(),
    timestamp: v.number(),
  }).index('by_timestamp', ['timestamp']),

  city_status: defineTable({
    status: v.string(),
    timestamp: v.number(),
  }).index('by_timestamp', ['timestamp']),

  messages: defineTable({
    conversationId,
    messageUuid: v.string(),
    author: playerId,
    text: v.string(),
    worldId: v.optional(v.id('worlds')),
  })
    .index('conversationId', ['worldId', 'conversationId'])
    .index('messageUuid', ['conversationId', 'messageUuid']),

  ...agentTables,
  ...heliotropeTables,
  ...engineTables,
});
