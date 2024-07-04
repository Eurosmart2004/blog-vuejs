# Blog Project

This project is a blogging platform that includes both a client and a server.

## Description

This blogging platform has core features such as creating blogs, updating blogs, viewing blogs, as well as user authentication features like login and register.

### Sub-Features

The project also includes additional features like:

- JWT token: Implements JSON Web Tokens for secure authentication.
- Forgot password: Includes a feature to send an email to users who have forgotten their password.
- Update profile
- Filter search: Allows users to search for blogs based on specific criteria.
- For each blog, only authenticated users can react (like, love, sad, ...) and comment.

## Getting Started

To get started, clone the repository and install the necessary libraries by running:

```
git clone https://github.com/Eurosmart2004/blog-vuejs-public.git
cd blog-vuejs-public
```

## Client

The client is built with Vue 3 and Vite.

### Recommended IDE Setup

We recommend using [VSCode](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (and disable Vetur).

### Client setup

```
cd client
npm install
```

### Running in Development

To start the client in development mode, run:

```
npm run dev
```

### Compile and Minify for Production

To build the client for production, run:

```
npm run build
```

### Customize configuration

For more details on the configuration, see [Vite](https://vitejs.dev/config/) Configuration Reference.

## Server

The server is a Node.js application.

### Running in Development

To start the server in development mode, run:

```
cd server
npm run dev
```
