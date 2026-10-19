export default class DB{
    static loader(){
        console.log("Loading DB");
    }

    static fetch(url){
        return fetch(url)
        .then((data) => data.json())
    }
}