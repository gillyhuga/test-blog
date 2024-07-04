<br />
<p align="center">
  <h1 align="center">
  <a href="https://test-blog.gillyhuga.com/">
    Test Blog
  </a>
  </h1>

### Feature

- **Blog Post List**: Displays a list of blog posts fetched from the GoRest API.
- **Blog Post Detail**: Shows detailed information about a selected blog post, including comments and the user who created it.
- **Users Management**: Allows Create, Read, Update, Delete, and Search operations on users.


### Built With
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vercel](https://vercel.com/)
  
## Getting Started

### Prerequisites
- [Node >= v18.17.0](https://nodejs.org/en/)

### Installation
- Clone repository
  ```
     https://github.com/gillyhuga/test-blog.git
  ```
- Go to the project directory
  ```
     cd test-blog
  ```
- Install dependencies

  ```
     npm install
  ```
- Copy the example environment variables file:
  ```
     cp .env.example .env.local
  ```
- Update .env.local with your Access Token:
  ```
     NEXT_PUBLIC_ACCESS_TOKEN= your_access_token_here
  ```
- Start the server
  ```
     npm run dev
  ```
- Open `http://localhost:3000` with your browser to see the result

### Running the Application
To run the application in your local environment, follow these steps:

1. Ensure you have the prerequisites installed.
2. Follow the installation steps provided above.
3. Use `npm run dev` to start the server in development mode.

## Additional Information

- For more details on how to use the application, refer to the [Next.js Documentation](https://nextjs.org/docs).
- To learn more about TypeScript, check out the [TypeScript Documentation](https://www.typescriptlang.org/docs/).
- For UI components, refer to the [Ant Design Documentation](https://ant.design/docs/react/introduce).
- To understand state management, see the [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started).
