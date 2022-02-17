module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ]
      },
    env: {
        DB_HOST: 'bxxvx8cvmo3oqtjgaspx-mysql.services.clever-cloud.com',
        DB_USER: 'u0olxaknixv8zbdb',
        DB_PASSWORD: '6A44fEZ7naJMiqb8ompg',
        DB_DATABASE: 'bxxvx8cvmo3oqtjgaspx',
        DB_PORT: '3306',
        SECRET_JWT_KEY: 'y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaN',
        MONGODB_URI: "mongodb+srv://adm:020565@cluster0.23uh2.mongodb.net",
        DB_NAME: "kanban"
    }
}