# Open Space

> API untuk platform open space. Mirip Twitter, tetapi cuma untuk bahan belajar di Dicoding.

*~Jangan terlalu serius. Data `talks` akan dihapus secara berkala.*

## Endpoint 
https://openspace-api.netlify.app/v1


### Register User
- URL
  - `/users`
- Method
  - POST
- Request Body
  - `id` as `string`
  - `name` as `string`
  - `password` as `string`, must be at least 6 characters
- Response
    ```json
    {
        "status": "success",
        "message": "User created",
        "data": {
            "user": {
                "id": "john_doe",
                "name": "John Doe",
                "photo": "https://generated-image-url.jpg"
            }
        }
    }
    ```

### Login
- URL
  - `/login`
- Method
  - POST
- Request Body
  - `id` as `string`
  - `password` as `string`
- Response
    ```json
    {
        "status": "success",
        "message": "ok",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw"
        }
   }
    ```

### See all users
- URL
  - `/users`
- Method
  - GET
- Response
    ```json
    {
        "status": "success",
        "message": "ok",
        "data": {
            "users": [
                {
                    "id": "john_doe",
                    "name": "John Doe",
                    "photo": "https://generated-image-url.jpg"
                },
                {
                    "id": "jane_doe",
                    "name": "Jane Doe",
                    "photo": "https://generated-image-url.jpg"
                },
                {
                    "id": "fulan",
                    "name": "Si Fulan",
                    "photo": "https://generated-image-url.jpg"
                }
            ]
        }
    }
    ```

### See own profile
- URL
  - `/users/me`
- Method
  - GET
- Headers
  - `Authorization`: `Bearer <token>`
- Response
    ```json
    {
        "status": "success",
        "message": "ok",
        "data": {
            "user": {
                "id": "john_doe",
                "name": "John Doe",
                "photo": "https://generated-image-url.jpg"
            }
        }
    }
    ```

### See all talks
- URL
  - `/talks`
- Method
  - GET
- Response
    ```json
    {
        "status": "success",
        "message": "ok",
        "data": {
            "talks": [
                {
                    "id": "talk-e32730137bbf20bed92b42b4792de20a",
                    "text": "Hello, World!",
                    "user": "john_doe",
                    "replyTo": "",
                    "createdAt": "2022-09-22T10:06:55.588Z",
                    "likes": []
                },
                {
                    "id": "talk-8d070f59429110c7b5e3f8ff5105e8aa",
                    "text": "Hello, John!",
                    "user": "jane_doe",
                    "replyTo": "talk-e32730137bbf20bed92b42b4792de20a",
                    "createdAt": "2022-09-22T10:07:06.150Z",
                    "likes": ["john_doe"]
                }
            ]
        }
    }
    
    ```

### See detail talk
- URL
  - `/talks/:id`
- Method
  - GET
- Response
    ```json
    {
      "status": "success",
      "message": "ok",
      "data": {
        "talkDetail": {
          "id": "talk-8d070f59429110c7b5e3f8ff5105e8aa",
          "text": "Hello, John!",
          "user": {
            "id": "jane_doe",
            "name": "Jane Doe",
            "photo": "https://generated-image-url.jpg"
          },
          "createdAt": "2022-09-22T10:06:55.588Z",
          "likes": ["john_doe"],
          "parent": {
            "id": "talk-e32730137bbf20bed92b42b4792de20a",
            "text": "Hello, World!",
            "user": {
              "id": "john_doe",
              "name": "John Doe",
              "photo": "https://generated-image-url.jpg"
            },
            "replyTo": "",
            "createdAt": "2022-09-22T10:06:55.588Z",
            "likes": []
          }
        }
      }
    }
    
    ```

### Create New Talk
- URL
  - `/talks`
- Method
  - POST
- Headers
  - `Authorization`: `Bearer <token>`
- Request Body
  - `text` as `string`
  - `replyTo` as `string`, optional
- Response
    ```json
    {
        "status": "success",
        "message": "Talk created",
        "data": {
            "talk": {
                "id": "talk-94a8601b27c16030402e06b23d557acc",
                "user": "jane_doe",
                "text": "Hello, John!",
                "createdAt": "2022-09-22T10:09:54.125Z",
                "replyTo": "talk-e32730137bbf20bed92b42b4792de20a",
                "likes": []
            }
        }
    }
    ```

### Toggle Like Talk
- URL
  - `/talks/like`
- Method
  - POST
- Headers
  - `Authorization`: `Bearer <token>`
- Request Body
  - `talkId` as `string`
- Response
    ```json
    {
        "status": "success",
        "message": "ok",
        "data": {}
    }
    ```
