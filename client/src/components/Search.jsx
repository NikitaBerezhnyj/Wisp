import React, { useState, useEffect } from "react";
import { getSearchedUser } from "../api/userApi";
import SearchCard from "./SearchCard";
import { FaTrash } from "react-icons/fa";
import "../styles/components/Search.css";

export default function Search() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Завантаження історії пошуків з localStorage при першому рендері
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  // Оновлення історії пошуків в localStorage
  const updateSearchHistory = newSearch => {
    const updatedHistory = [
      newSearch,
      ...searchHistory.filter(item => item !== newSearch)
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Видалення запиту з історії
  const handleDeleteFromHistory = queryToDelete => {
    const updatedHistory = searchHistory.filter(item => item !== queryToDelete);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  // Виконання пошуку
  const handleSearch = async searchQuery => {
    const query = searchQuery || searchPrompt; // Якщо передається запит з історії, використовуємо його
    if (query.trim() === "") return;

    setLoading(true);
    setError("");
    try {
      const results = await getSearchedUser(query);
      setSearchResults(results);
      updateSearchHistory(query); // Додавання запиту до історії
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  // Обробка кліку на запит з історії
  const handleHistoryClick = query => {
    setSearchPrompt(query); // Заповнити поле пошуку
    handleSearch(query); // Виконати пошук
  };

  // Виконання пошуку під час введення
  const handleInputChange = async e => {
    const query = e.target.value;
    setSearchPrompt(query); // Оновлення state

    if (query.trim() !== "") {
      setLoading(true);
      setError("");
      try {
        const results = await getSearchedUser(query);
        setSearchResults(results);
      } catch (err) {
        setError("An error occurred while searching.");
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]); // Очищення результатів, якщо поле пусте
    }
  };

  // Фільтрація результатів на основі searchPrompt
  const filteredResults = searchResults.filter(user =>
    user.username.toLowerCase().includes(searchPrompt.toLowerCase())
  );

  return (
    <div className="search-container">
      <h1>Search</h1>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for users..."
          className="search-input"
          value={searchPrompt}
          onChange={handleInputChange} // Виклик функції під час введення
        />
        <button className="search-button" onClick={() => handleSearch()}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Історія пошуків відображається тільки коли поле пошуку порожнє */}
      {searchPrompt === "" && (
        <div className="search-history">
          {searchHistory.length >= 1 ? (
            <ul>
              {searchHistory.map((query, index) => (
                <li key={index} className="history-item">
                  <span
                    className="history-query"
                    onClick={() => handleHistoryClick(query)}
                  >
                    {query}
                  </span>
                  <button
                    onClick={() => handleDeleteFromHistory(query)}
                    className="delete-history"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <h4>
              Search History is empty
              <br />
              Maybe you want to find someone?
            </h4>
          )}
        </div>
      )}

      {/* Результати пошуку */}
      {searchPrompt !== "" && (
        <div>
          {filteredResults.length > 0
            ? filteredResults.map((user, index) => (
                <div
                  onClick={() => {
                    setSearchPrompt(user.username); // Заповнити поле пошуку
                    updateSearchHistory(user.username);
                  }}
                >
                  <SearchCard
                    key={index}
                    username={user.username}
                    countFollowers={user.followers.length}
                    userAvatar={user.avatarImage}
                    onSelect={() => {
                      setSearchPrompt(user.username); // Заповнити поле пошуку
                      updateSearchHistory(user.username); // Додавання запиту до історії
                    }}
                  />
                </div>
              ))
            : !loading && <p>No users found</p>}
        </div>
      )}
    </div>
  );
}
