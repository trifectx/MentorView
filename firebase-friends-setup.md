# Firebase Friends System Setup

This document provides instructions for setting up the Firebase Firestore database for the MentorView friends system.

## Prerequisites

- You already have a Firebase project set up for authentication.
- You have the Firebase SDK installed in your Angular project.

## Firestore Database Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).

2. Select your project "mentorview-754f2".

3. In the left sidebar, click on "Firestore Database".

4. If you haven't already set up Firestore, click "Create database". Choose "Start in production mode" and select a location closest to your users.

## Security Rules Setup

1. Navigate to the "Rules" tab in the Firestore Database section.

2. Replace the default rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection rules
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Friend requests rules
    match /friendRequests/{requestId} {
      allow read: if request.auth != null && (
        resource.data.senderId == request.auth.uid || 
        resource.data.receiverId == request.auth.uid
      );
      allow create: if request.auth != null && request.auth.uid == request.resource.data.senderId;
      allow update: if request.auth != null && (
        resource.data.senderId == request.auth.uid || 
        resource.data.receiverId == request.auth.uid
      );
    }
  }
}
```

## Database Structure

The database structure consists of two collections:

### 1. Users Collection

Each document in the users collection represents a user with the following fields:

- Document ID: user's UID from Firebase Auth
- Fields:
  - `displayName`: User's display name (string)
  - `email`: User's email address (string)
  - `uid`: User's UID, matches document ID (string)
  - `photoURL`: Optional profile photo URL (string)
  - `friends`: Array of friend UIDs (array of strings)

### 2. Friend Requests Collection

Each document in the friendRequests collection represents a friend request with the following fields:

- Document ID: Combination of sender and receiver UIDs (`${senderId}_${receiverId}`)
- Fields:
  - `senderId`: UID of the user who sent the request (string)
  - `senderName`: Display name of the sender (string)
  - `senderEmail`: Email of the sender (string)
  - `receiverId`: UID of the user who receives the request (string)
  - `status`: Status of the request ('pending', 'accepted', or 'rejected') (string)
  - `createdAt`: Timestamp when the request was created (timestamp)

## Initial Setup after User Registration

When a user registers, you need to create a document in the users collection to store their friends list. The auth service has been modified to automatically handle this:

1. When a user registers, a document is created in the users collection with the user's information.
2. The document ID is the user's UID from Firebase Authentication.
3. The document contains the user's display name, email, UID, and an empty friends array.

## Index Requirements

For the friend requests queries to work efficiently, you may need to create the following composite indices:

1. Collection: `friendRequests`, Fields: `senderId` (Ascending) and `status` (Ascending)
2. Collection: `friendRequests`, Fields: `receiverId` (Ascending) and `status` (Ascending)

Firebase will prompt you to create these indices when the app makes its first query. You can click on the link in the error message to create them automatically.

## Testing

To test the friends system:

1. Register at least two user accounts.
2. Login with one account and navigate to the Friends page.
3. Add the other user as a friend.
4. Login with the other account to accept the friend request.
5. Verify that both users appear in each other's friends list.
