# 📝 Blog Post Platform

A simple platform to register users, log in, and manage blog posts with tags and pagination.

---

### ✅ Pre-requisites

- **Node.js** installed locally  
- **PostgreSQL** hosted on the cloud (managed service)

---

### 📦 Installation Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

## 🚀 Project Setup

### 🛠️ Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. **Install Dependencies**
npm install

3.**Set Up Environment Variables**

DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_PASSWORD=<your-database-password>
JWT_SECRET_KEY=<your-jwt-secret-key>
PORT=<your-app-port>

4. **Save ca.pem file in the config/ directory**

5. **Start the Server** using
npm start

API documentation

1. Endpoint: /user/register
httpMethod:POST
body: Object,
Request body strucutre:
body:{
{
"name":String,
"email":String,
"password":String,
}

Sample body:{
"name":"rahul",
"email":"rahul@gmail.com ",
"password":"12345"
}

Response: 
Status code:200
Response body: Object
{ message: String }
{ message: "user registered successfully" }


2. Endpoint: /user/login
httpMethod:POST
body: Object,
Request body strucutre :
body:{
{
"email":String,
"password":String,
}

Sample body:{
"email":"rahul@gmail.com ",
"password":"12345"
}

Response:
Status code:200
Response body: Object

Response structure:
{
"token": String
}

Sample Response
{
"token": "eyJhbGciOiJIUzI1NiI...."
}


3. Endpoint: /user/blog/
httpMethod:POST
body: Object,
Request body strucutre :
body:{
{
"blog_name": String
"description":String,
"content": String,
"tag": String
}

Sample body:
{
"blog_name": "The James Webb Telescope: A New Era of Space Discovery",
"description": "Peering deeper into the cosmos than ever before.",
"content": "With its advanced infrared capabilities, the James Webb Space Telescope is revealing the universe in ways never thought possible. This blog discusses the mission's goals, the science behind its technology, and some early discoveries that are reshaping our understanding of space.",
"tag": "science"
}
NOTE only these tags are allowed 
1. "tech",
OR
2. "science",
OR
3. "politics"

Response:
Status code:200
Response body: Object

Response structure:
{ message: String }

Sample Response
{ message: "blog created successfully!" }


4. Endpoint: /user/blog
httpMethod:GET
Query Parameters:
author=String
page=Number
tag=String

Sample query parameters
?author=rahul&page=1&tag=tech

Response:
Status code: 200
Response structure

{
"id": Number,
"author_name": String,
"blog_name": String,
"description": String,
"content": String,
"tag": String,
"createdAt": String,
"updatedAt": String
}
],
"total": Number,
"currentPage": Number,
"totalPages": Number
}
}

Sample response
{
"data": {
"data": [
{
"id": Integer,
"author_name": "rahul",
"blog_name": "The Future of Artificial Intelligence",
"description": "Where AI is headed and how it's changing our world.",
"content": "Artificial intelligence is revolutionizing everything from healthcare to transportation. This blog explores recent breakthroughs in machine learning, ethical considerations, and the impact AI might have on the job market in the coming decades.",
"tag": "tech",
"createdAt": "2025-04-21T06:08:01.860Z",
"updatedAt": "2025-04-21T06:08:01.860Z"
},



   
