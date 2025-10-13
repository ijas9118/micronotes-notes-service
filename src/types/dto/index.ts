export type TagDTO = {
  id: string;
  userId: string;
  tagName: string;
  color?: string;
  createdAt: Date;
};

export type NotesDTO = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
};
