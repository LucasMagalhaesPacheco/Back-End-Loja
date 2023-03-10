import {v4} from "uuid"

class GenerateId {
    
    public generate = ():string => {
        return v4()

    } 
}

export default GenerateId