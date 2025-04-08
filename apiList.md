# DevTinder APIs

authRouter
-POST / signup
-POST / login
-POST / logout

profile Router
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

connectionRequestRouter
- POST /request/send/interested/:userId     -------\\ Making these two Api in Dynamic:
- POST /request/send/ignored/:userId        -------// POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId   --------\\ Making these two Api in Dynamic:
- POST /request/review/rejected/:requestId   --------// POST / request/review/:status/:requestId

userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed  -Gets you the profile of other users on platform


Status: ignore, interested, accepted, rejected

    