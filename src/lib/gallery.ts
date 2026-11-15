export const photos = {
  waiting: { src: "/images/waiting-room.jpg", width: 1280, height: 720 },
  exam: { src: "/images/exam-room.jpg", width: 1152, height: 864 },
  evening: { src: "/images/evening-clinic.jpg", width: 1280, height: 720 },
  pain: { src: "/images/pain-consult.jpg", width: 1152, height: 864 },
  video: { src: "/images/video-visit.jpg", width: 1152, height: 864 },
  storefront: { src: "/images/south-side-clinic.jpg", width: 1152, height: 864 },
  ahsan: { src: "/images/portrait-ahsan.jpg", width: 864, height: 1152 },
  sidhu: { src: "/images/portrait-sidhu.jpg", width: 864, height: 1152 },
} as const;

export type PhotoName = keyof typeof photos;

export const servicePhoto: Record<string, PhotoName> = {
  "urgent-care": "exam",
  "pain-management": "pain",
  psychiatry: "video",
};

export const locationPhoto: Record<string, PhotoName> = {
  chicago: "storefront",
  hoffman: "evening",
};
