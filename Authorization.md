# Authorization
How to Implement/ support authorization in the website??
# Front End:
- If a user requests to edit/ delete something, you have to make sure they are the ones who created it in the first place.
- When sending the request make sure you also send in the body the token that is stored in the client side, the one that you get from the <App Consumer />, that way in the backend you can extract information from the token that helps you with authorization.

# Back End:

- In the route itself, you have to check the token received and make sure it matches the id of the creater of the task/ certificate/ review or whatever.
- The function that extracts data is already implemented and will show you an example of how to use it 

>router.get('/', (req, res) => {
>
>let verify = req.app.get('verifyToken')
>
>let ver = verify(req.body.token)
>
>if (ver) res.json(ver)
>
>else res.json('Error')
>})
 
- The function returns the data if the token is valid, then you can take the data in the then part and check its integrity
- the else part means the token is not even a valid token, which should be handled as well
