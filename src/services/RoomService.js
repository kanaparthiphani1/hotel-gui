import axios from "axios"
const ROOM_API_URL = "http://localhost:9090/roomapi/"

class RoomService {
    getRooms(){
        return axios.get(ROOM_API_URL + 'findAllRooms');
    }



}

export default new RoomService();
