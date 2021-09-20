## Task

This is a boilerplate code created by `django-admin` please use python 3.
The goal of this task is to create a little notepad using django REST API
The notepad model is:

`title`: the title of the notepad
`message`: the message text written
`owner`: the creator of the note
`created_at`: when the notes was created
`modified_at`: when the notes were modified

You task is make endpoints available in django rest that allows a user to create, read, update, list and delete the notes. Have error handling endpoints for cases where the note doesn't exist or an internel server error occurs. You should also react a react js application that performs CRUD operations to the database. This application needs to be built for scale. So you would also need to:
* implement pagination and filtering of the data
* create an authentication workflow (mvc) and authenticate the note owners for the required authentication endpoints
* Implement a method to update the frontend data in intervals or real time (your choice)
* Make create a new note be asyncronous
* Get notes created by a specific user

This task should take about 6 hours to complete but we understand that you may not have enough time on your hands, You have 3 days to complete the task and if you require extra time please let us know.


BONUS:
These are bonus tasks. Feel free to ignore if you like.
* make the endpoints accessible though a websocket. hint: `use django-channels`
* Lazy-load the react js component data to handle scale in data ingestion

If you have any additional questions please reach out to Okhaifo Oikeh via email at okhaifo@adoyen.com.
