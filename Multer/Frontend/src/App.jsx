import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      console.log("Upload response:", res.data); // Debug logging
      setImg(res.data.img); // Adjusted to match response structure
    } catch (err) {
      console.log("Upload error:", err); // Debug logging
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getimg");
        console.log("Fetch image response:", res.data); // Debug logging
        if (res.data.length > 0) {
          setImg(res.data[0].img);
        }
      } catch (err) {
        console.log("Fetch image error:", err); // Debug logging
      }
    };

    fetchImage();
  }, []);


  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload File</button>
      <br />
      <img src={`http://localhost:3000/images/${img}`} alt="img" />
    </div>
  );
};

export default App;





// This code is for handling multipe extansion files like pfd etc


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [img, setImg] = useState("");

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:3000/upload", formData);
//       console.log("Upload response:", res.data); // Debug logging
//       setImg(res.data.img); // Adjusted to match response structure
//     } catch (err) {
//       console.log("Upload error:", err); // Debug logging
//     }
//   };

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/getimg");
//         console.log("Fetch image response:", res.data); // Debug logging
//         if (res.data.length > 0) {
//           setImg(res.data[0].img);
//         }
//       } catch (err) {
//         console.log("Fetch image error:", err); // Debug logging
//       }
//     };

//     fetchImage();
//   }, []);

//   const isImage = (filename) => {
//     return /\.(jpg|jpeg|png|gif)$/i.test(filename);
//   };

//   console.log("Image path:", `http://localhost:3000/images/${img}`); // Debug logging

//   return (
//     <div>
//       <input type="file" onChange={e => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload File</button>
//       <br />
//       {img && (
//         isImage(img) ? (
//           <img src={`http://localhost:3000/images/${img}`} alt="img" />
//         ) : (
//           <a href={`http://localhost:3000/images/${img}`} target="_blank" rel="noopener noreferrer">
//             View File
//           </a>
//         )
//       )}
//     </div>
//   );
// };

// export default App;

