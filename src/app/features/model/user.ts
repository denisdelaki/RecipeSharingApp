export interface User {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    address: string | null;
    socials: {
      facebook?: string | null;
      twitter?: string | null;
      instagram?: string | null;
      blog?: string | null;
    };
}
