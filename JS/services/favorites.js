const FAVORITES_KEY = "favorites";

export function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(perfumeId) {
  return getFavorites().includes(perfumeId);
}

export function toggleFavorite(perfumeId) {
  const favorites = getFavorites();
  const alreadyFavorite = favorites.includes(perfumeId);

  const nextFavorites = alreadyFavorite
    ? favorites.filter((id) => id !== perfumeId)
    : [...favorites, perfumeId];

  saveFavorites(nextFavorites);

  return !alreadyFavorite;
}
