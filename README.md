# Final Project: Northstar Cafe Ordering System
Link: https://northstar-co.onrender.com

### Brief Description:
My final project for this class is a full stack website called northstar.co. It is a digital platform where customers can browse the Northstar Cafe's menu items, place drink orders, and learn about the cafe's story and branding. This is more personal to my friends and I, where we have loved gathering for coffee sessions, and that experience inspired me to create an online space that captures the connections. It will be an extension of the cafe itself: cozy, welcoming, and modern. We recreate the feelings, whether online or in person during this experience.

This responsive application has both public-facing and internal staff tools for managing orders and viewing business analytics. It extends to what was built for Assignment 2 and 3 into a more complete product MVP that supports the daily operations of the cafe. There are currently 3 drinks available that are usually ordered, however in future iterations, it will have more options, especially when it comes to different categories like food sandwiches.

### Additional Instructions
To access staff pages and login, use the following ONLY account. The order pages can be used without login.

Username: admin

Password: admin

### Technologies Used
The technologies used for this project are Next.js (A react framework), Render (deployment), RadixUI (base UI), TailwindCSS (Responsive CSS), MongoDB (database), and Express (backend & cookies), Chart.js (analytics), and dayjs (time). Tools will focus on server-side programming and will be done through JavaScript. This responsive and dynamic experience will reflect the simplicity and values of the cafe.

### Challenges Faced
One of the main challenges was implementing Chart.js and the login system with cookie-based session management with express.js, then integrating it with our MongoDB database. Chart.js is what I would call a more modern version of D3.js (less in depth of graphical portions). However, it is something I have never used before, and I had to follow some YouTube guides to understand how to set it up correctly, then have the data be in. To grab live data and then process for visualization needed a lot more technical depth, but it was super rewarding for business aspects. 

Additionally, the login system with cookie-based session management was difficult. I originally wanted to try OAuth, but however since this application only needs one management accoount, the chance to login with GitHub and Google is not really security safe. Additionally, the middleware needed to be edited in depth from the past assignments, as there are more API endpoints that need to be secured, and for a couple hours, I couldn't figure out how to correctly prohibit users from seeing the admin page. My approach ended up being creating arrays to manage public/private pages and API endpoints and process them in the app.use() middleware in server.js.

### My Contributions
I was alone on this project, and I was responsible for the end to end of this application. I started off drawing my interface on my notebook, setting project files with middleware and database. developed components, integrated Chart.js and login functionalities, and then deployed using Render.

### Accesibility
This application is responsive, meaning this will correctly size itself based on the device it is being used (mobile, tablet, desktop).




