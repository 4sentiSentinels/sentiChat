// your code goes here
let userMessages = [];

function ObjectId(i) {

}

function ISODate(i) {
  
}
docs = [{
	"_id" : ObjectId("58a01be0756665215e167c42"),
	"msg" : "hey",
	"nick" : "a",
	"created" : ISODate("2017-02-12T08:25:04.744Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a01c1c756665215e167c43"),
	"msg" : "yo",
	"nick" : "b",
	"created" : ISODate("2017-02-12T08:26:04.595Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a01c33756665215e167c44"),
	"msg" : "/w a hey yo",
	"nick" : "b",
	"created" : ISODate("2017-02-12T08:26:27.810Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a01cc4756665215e167c45"),
	"msg" : "w/ a yoyo",
	"nick" : "c",
	"created" : ISODate("2017-02-12T08:28:52.672Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a0214edb0e1b22947d9af6"),
	"msg" : "yo",
	"nick" : "d",
	"created" : ISODate("2017-02-12T08:48:14.026Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a0247eaef6232306451ebc"),
	"msg" : "/w e whisper",
	"nick" : "a",
	"created" : ISODate("2017-02-12T09:01:50.470Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a026f23df81523e6e3e831"),
	"msg" : "qwerty",
	"nick" : "b",
	"created" : ISODate("2017-02-12T09:12:18.948Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a027123df81523e6e3e832"),
	"msg" : "qwe",
	"created" : ISODate("2017-02-12T09:12:50.561Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a03fd85791402abc318913"),
	"msg" : "hey",
	"nick" : "b",
	"created" : ISODate("2017-02-12T10:58:32.803Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a03fe25791402abc318914"),
	"msg" : "heya",
	"nick" : "a",
	"created" : ISODate("2017-02-12T10:58:42.955Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a045c20b4f152c66e80699"),
	"msg" : "sadasda",
	"nick" : "sada",
	"created" : ISODate("2017-02-12T11:23:46.468Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a045ec0b4f152c66e8069a"),
	"msg" : "sdasda",
	"nick" : "sada",
	"created" : ISODate("2017-02-12T11:24:28.889Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a046ff7dc1e62cc4f2bd78"),
	"msg" : "1",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:03.361Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047007dc1e62cc4f2bd79"),
	"msg" : "2",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:04.314Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047017dc1e62cc4f2bd7a"),
	"msg" : "3",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:05.226Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047017dc1e62cc4f2bd7b"),
	"msg" : "4",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:05.937Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047027dc1e62cc4f2bd7c"),
	"msg" : "5",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:06.840Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047037dc1e62cc4f2bd7d"),
	"msg" : "6",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:07.002Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047037dc1e62cc4f2bd7e"),
	"msg" : "7",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:07.618Z"),
	"__v" : 0
},
{
	"_id" : ObjectId("58a047067dc1e62cc4f2bd7f"),
	"msg" : "8",
	"nick" : "b",
	"created" : ISODate("2017-02-12T11:29:10.914Z"),
	"__v" : 0
}]

for(iter = 0; iter < docs.length - 1; iter++) 
{	let msg = ''
	for(jter = iter + 1 ; jter < docs.length; jter++ )
	{
		if(docs[iter].nick === docs[jter].nick){
			msg = msg + docs[iter].msg + ' ';
		}
	}
	userMessages.push({user: docs[iter].nick, msg: msg})
}

if(docs[2].nick === docs[3].nick)
console.log("jhvhhj")
console.log(docs[2].nick, docs[3].nick)

console.log(userMessages)