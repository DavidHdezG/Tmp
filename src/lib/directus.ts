import { createDirectus, rest, staticToken, readItems } from '@directus/sdk';
import type { Event, Artist, BoardMember } from './types';

const client = createDirectus(import.meta.env.DIRECTUS_URL)
  .with(staticToken(import.meta.env.DIRECTUS_TOKEN))
  .with(rest());

export async function getPublishedEvents(): Promise<Event[]> {
  try {
    return await client.request(
      readItems('events', {
        filter: { status: { _eq: 'published' } },
        sort: ['date'],
        limit: 100,
      })
    ) as Event[];
  } catch (err) {
    console.error('[Directus] getPublishedEvents failed:', err);
    return [];
  }
}

export async function getPublishedArtists(): Promise<Artist[]> {
  try {
    return await client.request(
      readItems('artists', {
        filter: { status: { _eq: 'published' } },
        sort: ['name'],
        limit: 100,
      })
    ) as Artist[];
  } catch (err) {
    console.error('[Directus] getPublishedArtists failed:', err);
    return [];
  }
}

export async function getPublishedBoardMembers(): Promise<BoardMember[]> {
  try {
    return await client.request(
      readItems('board_members', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort', 'name'],
        limit: 100,
      })
    ) as BoardMember[];
  } catch (err) {
    console.error('[Directus] getPublishedBoardMembers failed:', err);
    return [];
  }
}

export function getAssetUrl(fileId: string, params?: { width?: number; height?: number; fit?: string }): string {
  // PUBLIC_DIRECTUS_URL: browser-accessible URL (never the internal Docker hostname)
  const base = `${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${fileId}`;
  if (!params) return base;
  const qs = new URLSearchParams();
  if (params.width) qs.set('width', String(params.width));
  if (params.height) qs.set('height', String(params.height));
  if (params.fit) qs.set('fit', params.fit);
  return `${base}?${qs}`;
}