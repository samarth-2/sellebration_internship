require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser=require('body-parser');
const cors=require('cors');


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


const mysql = require('mysql2')
const db = mysql.createConnection(process.env.DATABASE_URL);


app.get('/test', (req, res) => {
  const getAll="select * from test;";
  db.query(getAll,(err,result)=>{
      res.send(result)
  })
})


app.get('/', (req, res) => {
  res.send("hello")
})

//Home -- connection 4 table our stories 1 table latest news

app.get('/home/our-stories/OurStories',(req,res)=>{
  const ele1="select * from OurStories_Recommended;";
  const ele2="select * from OurStories_Leadership;";
  const ele3="select * from OurStories_Csr;";
  const ele4="select * from OurStories_Sustainability;";
  var x=req.query.name;
  if(x=="recommended")
  {
    db.query(ele1,(err,result)=>{
      res.send(result)
    })
  }
  else if(x==="leadership")
  {
    db.query(ele2,(err,result)=>{
      res.send(result)
    })
  }
  else if(x==="csr")
  {
    db.query(ele3,(err,result)=>{
      res.send(result)
    })
  }
  else if(x=="sustainability")
  {
    db.query(ele4,(err,result)=>{
      res.send(result)
    })
  }
  else
  {
    var result={data:["err"]}
    res.send(result)
  }
})

app.get('/home/latest-news',(req,res)=>{
  const ele="select * from Home_LatestNews order by date desc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})











//Leadership -- connection 4 table

app.get('/leadership/detail-each',(req,res)=>{
  const ele1="select * from Leadership_Director;";
  const ele2="select * from Leadership_Head;";
  const ele3="select * from Leadership_Leader;";
  const ele4="select * from Leadership_Vanguard;";
  var y=req.query.name;
  if(y=="director")
  {
    db.query(ele1,(err,result)=>{
      res.send(result)
    })
  }
  else if(y=="head")
  {
    db.query(ele2,(err,result)=>{
      res.send(result)
    })
  }
  else if(y=="leader")
  {
    db.query(ele3,(err,result)=>{
      res.send(result)
    })
  }
  else if(y=="vanguard")
  {
    db.query(ele4,(err,result)=>{
      res.send(result)
    })
  }
  else
  {
    var result={data:["err"]}
    res.send(result)
  }
})









// event section data get

app.get('/event/all-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from event order by date desc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})





// mediarelease section data get

app.get('/media-release/all-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from mediarelease order by date asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})




// pressreport section data get

app.get('/press-report/all-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from pressreport order by date asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})


// Stories section data get

app.get('/stories/all-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from stories order by date asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})




// investor_update section data get

app.get('/investor/update-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from investor_update order by id asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})

// investor_company section data get

app.get('/investor/company-data',(req,res)=>{
  var e=req.query.name;
  const ele="select id,name,info from investor_Company order by id asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})





// innovation_insight section data get

app.get('/innovation/insight-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from Innovation_Insight order by id asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})

app.get('/innovation/card-data',(req,res)=>{
  var e=req.query.name;
  const ele="select * from Innovation_Card order by id asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})

//downloads sec1 log data

app.get('/download/log-data',(req,res)=>{
  const ele="select * from Download_Log ;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})

app.get('/download/company-data',(req,res)=>{
  const ele="select * from Download_Company ;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})



//women leadership log data

app.get('/women-leadership/redefining-data',(req,res)=>{
  const ele="select * from Women_Leadership_Redefining_Boundaries;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})

app.get('/women-leadership/better-data',(req,res)=>{
  const ele="select * from Women_Leadership_Better_Together order by id asc;";
  db.query(ele,(err,result)=>{
    res.send(result)
  })
})


// post request


//contact us data update
// ContactUs





app.post('/contact-us/full-data',(req,res)=>{
  var name=req.body.name;
  var email=req.body.email;
  var org=req.body.org;
  var contact=req.body.contact;
  var qfor=req.body.qfor;
  var qtype=req.body.qtype;
  var yourQ=req.body.yourQ;
  
  const ele="insert into ContactUs(name,Organisation,Email,contact,queryFor,queryType,yourQuery) values(?,?,?,?,?,?,?);";

  db.query(ele,[name,org,email,contact,qfor,qtype,yourQ],(err,result)=>{
    res.send(result);
  })
})

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`listning on port ${port}`);
});