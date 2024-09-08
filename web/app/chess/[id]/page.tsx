"use client";
import { Chess } from "chess.js";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa";
import { FaChessBishop } from "react-icons/fa";
import { io } from "socket.io-client";


const chess = new Chess()
function getIcon(i){
if(i=='p') return <FaChessPawn  />
if(i=='b') return <FaChessBishop />
if(i=='q') return <FaChessQueen />
if(i=='k') return <FaChessKing />
if(i=='n') return <FaChessKnight />
if(i=='r') return <FaChessRook />
return null;
}
function getColor(c){
  if(c=='w') return '#f8f8f8'
  return 'black'
  
}

function getBg(i){
  if(i%2==0) return '#b58862'
  return '#f0d9b5'
}

function customMoves(movees){
 const moves = [...movees]
  const template = [
    [
      { square: 'a8', type: null, color: 'b' },
      { square: 'b8', type: null, color: 'b' },
      { square: 'c8', type: null, color: 'b' },
      { square: 'd8', type: null, color: 'b' },
      { square: 'e8', type: null, color: 'b' },
      { square: 'f8', type: null, color: 'b' },
      { square: 'g8', type: null, color: 'b' },
      { square: 'h8', type: null, color: 'b' }
    ],
    [
      { square: 'a7', type: null, color: 'b' },
      { square: 'b7', type: null, color: 'b' },
      { square: 'c7', type: null, color: 'b' },
      { square: 'd7', type: null, color: 'b' },
      { square: 'e7', type: null, color: 'b' },
      { square: 'f7', type: null, color: 'b' },
      { square: 'g7', type: null, color: 'b' },
      { square: 'h7', type: null, color: 'b' }
    ],
    [
      { square: 'a6', type: null, color: 'w' },
      { square: 'b6', type: null, color: 'w' },
      { square: 'c6', type: null, color: 'w' },
      { square: 'd6', type: null, color: 'w' },
      { square: 'e6', type: null, color: 'w' },
      { square: 'f6', type: null, color: 'w' },
      { square: 'g6', type: null, color: 'w' },
      { square: 'h6', type: null, color: 'w' }
    ],
    [
      { square: 'a5', type: null, color: 'w' },
      { square: 'b5', type: null, color: 'w' },
      { square: 'c5', type: null, color: 'w' },
      { square: 'd5', type: null, color: 'w' },
      { square: 'e5', type: null, color: 'w' },
      { square: 'f5', type: null, color: 'w' },
      { square: 'g5', type: null, color: 'w' },
      { square: 'h5', type: null, color: 'w' }
    ],
    [
      { square: 'a4', type: null, color: 'w' },
      { square: 'b4', type: null, color: 'w' },
      { square: 'c4', type: null, color: 'w' },
      { square: 'd4', type: null, color: 'w' },
      { square: 'e4', type: null, color: 'w' },
      { square: 'f4', type: null, color: 'w' },
      { square: 'g4', type: null, color: 'w' },
      { square: 'h4', type: null, color: 'w' }
    ],
    [
      { square: 'a3', type: null, color: 'b' },
      { square: 'b3', type: null, color: 'b' },
      { square: 'c3', type: null, color: 'b' },
      { square: 'd3', type: null, color: 'b' },
      { square: 'e3', type: null, color: 'b' },
      { square: 'f3', type: null, color: 'b' },
      { square: 'g3', type: null, color: 'b' },
      { square: 'h3', type: null, color: 'b' }
    ],
    [
      { square: 'a2', type: null, color: 'w' },
      { square: 'b2', type: null, color: 'w' },
      { square: 'c2', type: null, color: 'w' },
      { square: 'd2', type: null, color: 'w' },
      { square: 'e2', type: null, color: 'w' },
      { square: 'f2', type: null, color: 'w' },
      { square: 'g2', type: null, color: 'w' },
      { square: 'h2', type: null, color: 'w' }
    ],
    [
      { square: 'a1', type: null, color: 'b' },
      { square: 'b1', type: null, color: 'b' },
      { square: 'c1', type: null, color: 'b' },
      { square: 'd1', type: null, color: 'b' },
      { square: 'e1', type: null, color: 'b' },
      { square: 'f1', type: null, color: 'b' },
      { square: 'g1', type: null, color: 'b' },
      { square: 'h1', type: null, color: 'b' }
    ]
  ];

for(let i=0; i<moves.length;i++){
  for(let j=0; j<moves[i].length; j++){
    if(moves[i][j]){
template[i][j] = moves[i][j]
    }
  }
}  

return template
}


export default function ChessPage() {
    const {id} = useParams()
  console.log("mounted")
const [Socket,setSocket] = useState(undefined)
const [myTurn, setMyTurn] = useState(false)
 useEffect(()=>{
const socket = io("http://localhost:2000")
socket.emit("joinRoom",id)

socket.on("message",(message)=>{


    chess.load(message)
    refresh();
})
socket.on("val",(val)=>{
    if(!sessionStorage.getItem(id)){
       
       if(val==1){
        sessionStorage.setItem(id,'w')
       
       }else if(val==2){
        sessionStorage.setItem(id,'b')
       }else{
        sessionStorage.setItem(id,'z')
       }
       window.location.reload()
    }
  
})
setSocket(socket)

return () => {
    socket.emit("left",id)
    socket.disconnect();
  };

 },[]) 

  console.log(chess.ascii())
  const [allmoves,setallmoves] = useState( customMoves( chess.board()))
  


  const [selected, setselected] = useState(null)
  let movess = []
const [comment,setcomment] = useState("")

const refresh = ()=>{
  console.log(chess.ascii())
  let tmoves = chess.board();
  let cm = chess.getComment()

if(cm) setcomment(cm)

  setallmoves(customMoves( tmoves))

if(chess.isCheckmate()){
  alert("Gameover! " + chess.turn() + " Lost")
  Socket?.emit("gameover",id)
  
}
else if(chess.isDraw()){
  alert("Draw")
  Socket?.emit("gameover",id)
}
else if(chess.isInsufficientMaterial()){
  alert("Insufficient Material")
  Socket?.emit("gameover",id)
}
else if(chess.isGameOver()){
  alert("Game over!")
  Socket?.emit("gameover",id)
}


}

  const getMoves = (e)=>{


    if(chess.turn()==sessionStorage.getItem(id) ) setMyTurn(true)
        if(chess.turn()==sessionStorage.getItem(id) ) setMyTurn(true)
            

     
    
   

if(!myTurn) return

  if(movess.length>=1 && movess.includes(e.currentTarget.id) ){
  console.log("HII")
       chess.move(`${selected}${e.currentTarget.id}`)
      
      Socket.emit("message",chess.fen(),id)
      setMyTurn(false)
   
  }else{
    if(e.currentTarget.innerHTML.length>1){
      setselected(e.currentTarget.id)
     
    } 
  }
 

  }


  useEffect(()=>{
    
    if(!selected) return
    let movm = chess.moves({ square:selected, verbose:true })

let mov = []
  for(let i=0; i<movm.length; i++){
   mov.push(movm[i].to)
    document.getElementById(movm[i].to)?.classList.add('selected')
  }

  console.log(mov)
  movess = [...mov]

 
  },[selected])
  

const copyLink=(e)=>{
  navigator.clipboard.writeText(window.location.href)
e.currentTarget.innerHTML = "Copied";
let btn = e.currentTarget;
setTimeout(() => {
  btn.innerHTML = "Copy";
}, 1000);
}



  return (
    <div className="flex">

    <div>
 <div className="flex gap-7 justify-center items-center mb-3">  <h1 className="text-3xl">Share this Link to your Friend and Play!</h1>  <button className="bg-white text-black p-2" onClick={copyLink}>Copy</button></div>
    <div key={Math.random()} className={`flex ${sessionStorage.getItem(id)!='w'&&'flex-col-reverse'} ${sessionStorage.getItem(id)=='w'&&'flex-col'} `}>
    {allmoves.map((el,m)=>{
      return <div key={Math.random()} className="flex">{el.map((l,i)=><div id={l?.square} onClick={getMoves} key={l?.square} className="w-20 h-20 p-2 text-5xl   flex justify-center items-center " style={{color:getColor(l?.color), backgroundColor:getBg(i+m)}}>{getIcon(l?.type)}</div>)}</div>
    })}
    </div>

<h1>
{chess.turn()=='w'&&"White's Turn "}{chess.turn()=='b'&&"Black's Turn "} </h1>    

<h1>
{sessionStorage.getItem(id)=='z'&&'You are a Viewer only!'}</h1>
</div>

<div className="ml-10">
<h1>{comment}</h1>
</div>
   </div>
  );
}
