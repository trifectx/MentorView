export interface UserRecord {
    uid: string;
    email: string;
    displayName: string;
    friends: string[]; // Array of user UIDs (or can be expanded to objects if needed)
}
