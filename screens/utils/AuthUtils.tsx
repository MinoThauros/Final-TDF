//returns a string witch translates error codes to snack bar messages
const ProcessError = (response: any) => {
    if(response.data.error){
        return response.data.error.message
    }

}