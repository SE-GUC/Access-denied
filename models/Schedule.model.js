const mongoose = require('mongoose')
const uri = 'mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true'

mongoose.connect(uri, {
    useNewUrlParser: true
})

var ObjectId = mongoose.Schema.Types.ObjectId;

const ScheduleSchema = new mongoose.Schema({
    //A Schedule is built of 7 days, each day has a list of slots (1-hour each) 
    Saturday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Sunday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Monday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Tuesday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Wednesday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Thursday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ]),
    Friday:([
        {from:{
            type:number,
            required:true
        },
        to:{
            type:number,
            required:true
        },
        available:{
            type:boolean,
            required:true,
            default:true
        },
        assignedTo:{
            type:ObjectId
        }

        }
    ])
});

module.exports = mongoose.model("Schedule",ScheduleSchema);