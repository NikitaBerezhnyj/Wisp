// import React, { useState } from "react";
// import { getSearchedUser } from "../api/userApi";
// import SearchCard from "./SearchCard";
// import "../styles/components/Search.css";

// export default function Search() {
//   const [searchPrompt, setSearchPrompt] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (searchPrompt.trim() === "") return;

//     setLoading(true);
//     setError("");
//     try {
//       const results = await getSearchedUser({ searchPrompt });
//       setSearchResults(results);
//       console.log(results);
//     } catch (err) {
//       setError("An error occurred while searching.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="search-container">
//       <h1>Search</h1>
//       <div className="search-input-container">
//         <input
//           type="text"
//           placeholder="Search for users..."
//           className="search-input"
//           value={searchPrompt}
//           onChange={e => setSearchPrompt(e.target.value)}
//         />
//         <button className="search-button" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div>
//         {searchResults.length > 0
//           ? searchResults.map((user, index) => (
//               <SearchCard
//                 key={index}
//                 username={user.username}
//                 countFollowers={user.countFollowers}
//                 userAvatar={user.avatarImage}
//               />
//             ))
//           : !loading && <p>No users found</p>}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { getSearchedUser } from "../api/userApi";
import SearchCard from "./SearchCard";
import "../styles/components/Search.css";

export default function Search() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (searchPrompt.trim() === "") return;

    setLoading(true);
    setError("");
    try {
      const results = await getSearchedUser(searchPrompt); // Параметр передається як рядок
      setSearchResults(results);
      console.log(results);
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for users..."
          className="search-input"
          value={searchPrompt}
          onChange={e => setSearchPrompt(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div>
        {searchResults.length > 0
          ? searchResults.map((user, index) => (
              <SearchCard
                key={index}
                username={user.username}
                countFollowers={user.countFollowers}
                userAvatar={user.avatarImage}
              />
            ))
          : !loading && <p>No users found</p>}
      </div>
    </div>
  );
}
