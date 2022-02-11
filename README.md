# 📖 Employee Directory

A list of employees where each employee is encapsulated in a card that exposes intuitive buttons for the user to interact with.
This app is also mobile-friendly and offers routes that filter employees by city or country.

To see it for yourself, please refer to the `Developers` section below!

## ✍️ Approach
- **Decide on tech stack and complete backend**
  - Gather suggested features in the spec doc and prioritize in order of importance
  - Decide on the tech stack (refer to `Built With` below)
  - Set up database in `MongoDB Atlas` to prevent having to install MongoDB locally
  - Create backend directory using the blank template in `Keystone.js`
  - Seed data into the database from a [third party person API](https://randomuser.me)
- **Initialize and complete frontend**
  - Create frontend directory using the minimal template in `create-react-app`
  - Configure `Apollo Client` and pull data into frontend via a graphql query
  - Complete a responsive `Header` and attach to every page of the app
  - Style and display employees in a responsive CSS grid
  - Add a button that opens a modal of forms to create an employee (create a custom hook `useForm` to separate out form logic)
  - Implement a search bar using `React.useContext` to share search state across the app
  - Add edit buttons to update and delete employees
  - Add an info button that opens up a drawer displaying the remaining properties of the employee
  - Create routes where employees can be filtered by city or country
- **Apply final touches**
  - Implement the ability to toggle between dark and light modes
  - Test the app's core functionalities and fix minor bugs
  - Stop ~8 hours and leave unfinished work in `Next Steps` below

## 🎨 Features
- Server-side rendering and client-side caching, routing, and state management
- GraphQL to query and mutate data stored in a remote MongoDB
- Drawer that opens up fine details of the employee as well as a clipboard to copy email
- Search box that looks for an employee match in either the first name or last name
- Support for CRUD operations on employees via forms and buttons
- Admin interface to swiftly manage backend data
- Responsive design and CSS transitions in nav items
- Toggle between dark and light modes (props to Chakra UI!)

## 💁‍♂️ Next Steps
- Testing CRUD operations and snapshot testing for the frontend
- Pagination where the number of items displayed per page can be customized
- User registration, authentication, permissions, and password reset
- Smaller employee cards in mobile view
- Apply `debounce` and optimize the search functionality for speed
- Rent domain, set up servers, and deploy!

## 🔩 Built With

- [Keystone](https://keystonejs.com/) - Headless CMS that facilitates schema creation and provides GraphQL APIs based on schema
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database
- [Next.js](https://nextjs.org/) - React web framework for server-side rendering
- [Apollo Client](https://www.apollographql.com/docs/react/) - State management library to manage data with GraphQL and implement caching
- [Chakra UI](https://chakra-ui.com/) - Simple, modular, and accessible component library for React
  
## 💻 Developers
### To run this app locally:
- Clone this repository:
```
git clone https://github.com/ysmike/employee-directory.git
```

- Install dependencies in the backend directory and run server
```
cd employee-directory/backend && npm i && npm run dev
```

- Create a new instance of your terminal and navigate to the directory where you cloned the repo
  
- Install dependencies in the frontend directory and run client
```
cd employee-directory/frontend && npm i && npm run dev
```

- The backend Keystone UI should be available in:

```
http://localhost:3000/
```

- The employee directory should be available in:

```
http://localhost:7777/
```