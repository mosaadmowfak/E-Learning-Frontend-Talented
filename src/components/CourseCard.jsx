// src/components/CourseCard.jsx
import React from "react";

export default function CourseCard({ course }) {
  // الحقول اللي ممكن تختلف حسب الـ backend: id, title, name, shortDescription, imageUrl
  const title = course.title || course.name || "Untitled";
  const desc = course.shortDescription || course.description || "";
  const img = course.imageUrl || course.image || "/placeholder.png";

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{height:160, overflow:"hidden", background:"#efefef"}}>
        <img src={img} alt={title} style={{width:"100%", height:"160px", objectFit:"cover"}} />
      </div>
      <div style={{padding:12, flexGrow:1, display:"flex", flexDirection:"column"}}>
        <h3 style={{margin:0, fontSize:16, fontWeight:600}}>{title}</h3>
        <p style={{marginTop:8, marginBottom:12, color:"#374151", fontSize:13, flexGrow:1}}>
          {desc.length > 120 ? desc.slice(0,120) + "..." : desc}
        </p>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <button style={{
            padding:"8px 12px",
            background:"#111827",
            color:"#fff",
            border:"none",
            borderRadius:6,
            cursor:"pointer"
          }}>
            Open
          </button>
          <span style={{fontSize:13, color:"#6b7280"}}>{course.category || ""}</span>
        </div>
      </div>
    </div>
  );
}
