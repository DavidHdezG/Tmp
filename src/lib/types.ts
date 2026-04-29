export interface DirectusFile {
  id: string;
  filename_disk: string;
  title?: string;
}

export interface Event {
  id: string;
  status: 'published' | 'draft' | 'archived';
  title: string;
  date: string;        // ISO date: "2024-04-15"
  time: string;        // display string: "10:00 AM – 6:00 PM"
  location: string;
  description: string;
  image?: string | DirectusFile;
}

export interface Artist {
  id: string;
  status: 'published' | 'draft' | 'archived';
  name: string;
  type: string;        // "Contemporary Dancer & Choreographer"
  bio: string;
  photo?: string | DirectusFile;
  website?: string;
}

export interface BoardMember {
  id: string;
  status: 'published' | 'draft' | 'archived';
  name: string;
  photo?: string | DirectusFile;
  sort?: number;
}