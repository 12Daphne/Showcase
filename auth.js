class auth {
    constructor(){

    }


    logout(){
        //removes token and sends the player to the login page
        localStorage.removeItem('token');
    }

    checkAuth(){
        //checks if the user has a valid session token
    }


}