import { useEffect, useRef, useState } from "react";
import "./App.css";

const sidebarSections = [
  {
    title: "Home",
    items: ["Ethiopian Music", "Featured Artists", "Popular Ethiopian Tracks", "New Releases"],
  },
  {
    title: "Search",
    items: ["Search artists", "Search songs", "Search in English / Amharic"],
  },
  {
    title: "Artists",
    items: ["Artist profiles"],
  },
  {
    title: "Your Library",
    items: ["Liked Songs", "Playlists"],
  },
];

const featuredArtists = [
  {
    name: "Aster Aweke",
    genre: "Classic Ethiopian Pop",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mihret",
    genre: "Afro-fusion",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Yared Negu",
    genre: "Soul & Rhythm",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Gigi",
    genre: "Contemporary Ethiopian",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mulatu Astatke",
    genre: "Jazz & Ethio Groove",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Meklit Hadero",
    genre: "Cultural Fusion",
    image:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80",
  },
];

const popularTracks = [
  {
    title: "Addis to the World",
    artist: "Ethiopian House Mix",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Ethiopian Nights",
    artist: "Aster Aweke",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "The Sound of Addis",
    artist: "Mihret",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Golden Morning",
    artist: "Yared Negu",
    image:
      "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Abyssinian Beat",
    artist: "Mulatu Astatke",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    title: "Harar Rhythm",
    artist: "Meklit Hadero",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];

const navContent = {
  Home: {
    eyebrow: "ETHIOPIAN SOUND",
    title: "Feel the rhythm of Addis.",
    text: "Explore classic Ethio-jazz, modern Afro-fusion, and the artists keeping Ethiopia’s sound alive across the world.",
  },
  Search: {
    eyebrow: "DISCOVER",
    title: "Search your sound.",
    text: "Find artists, songs, and playlists in English or Amharic across Ethiopia’s vibrant music scene.",
  },
  Artists: {
    eyebrow: "FEATURED VOICES",
    title: "Meet the voices of Ethiopia.",
    text: "From modern Afro-fusion to timeless Ethio-jazz, these artists shape the rhythm of the country.",
  },
  "Your Library": {
    eyebrow: "YOUR COLLECTION",
    title: "Curated for your listening mood.",
    text: "Save your favorites, replay your beloved tracks, and build playlists around your Ethiopian sound.",
  },
};

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [activeTrack, setActiveTrack] = useState(popularTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = activeTrack.audio;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [activeTrack, isPlaying]);

  const handleTrackPlay = (track) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (!activeTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const heroInfo = navContent[activeNav];

  const filteredArtists = featuredArtists.filter((artist) =>
    `${artist.name} ${artist.genre}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredTracks = popularTracks.filter((track) =>
    `${track.title} ${track.artist}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderPageContent = () => {
    if (activeNav === "Home") {
      return (
        <>
          <section className="hero">
            <div>
              <p className="small-text">{heroInfo.eyebrow}</p>
              <h1>{heroInfo.title}</h1>
              <p className="hero-description">{heroInfo.text}</p>
              <button type="button" className="green-button" onClick={() => handleTrackPlay(popularTracks[0])}>
                Explore Ethiopian Music
              </button>
            </div>
          </section>

          <section className="music-section">
            <div className="section-header">
              <h2>Featured Artists</h2>
              <button type="button">Show all</button>
            </div>

            <div className="song-grid">
              {featuredArtists.map((artist) => (
                <article className="song-card" key={artist.name}>
                  <div className="cover-container">
                    <img src={artist.image} alt={artist.name} />
                    <button type="button" className="card-play" onClick={() => handleTrackPlay(popularTracks[0])}>
                      ▶
                    </button>
                  </div>
                  <h3>{artist.name}</h3>
                  <p>{artist.genre}</p>
                  <span>Featured</span>
                </article>
              ))}
            </div>
          </section>

          <section className="music-section">
            <div className="section-header">
              <h2>Popular Ethiopian Tracks</h2>
              <button type="button">Show all</button>
            </div>

            <div className="song-grid">
              {popularTracks.map((track) => (
                <article className="song-card" key={track.title}>
                  <div className="cover-container">
                    <img src={track.image} alt={track.title} />
                    <button type="button" className="card-play" onClick={() => handleTrackPlay(track)}>
                      {activeTrack.title === track.title && isPlaying ? "❚❚" : "▶"}
                    </button>
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                  <span>Popular now</span>
                </article>
              ))}
            </div>
          </section>
        </>
      );
    }

    if (activeNav === "Search") {
      return (
        <>
          <h1 className="page-title">Search</h1>
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search artists, songs, or playlists"
            />
          </div>

          {filteredArtists.length === 0 && filteredTracks.length === 0 ? (
            <p className="no-results">No results found for "{searchValue}".</p>
          ) : (
            <div className="music-section">
              {filteredArtists.length > 0 && (
                <>
                  <div className="section-header">
                    <h2>Artists</h2>
                  </div>
                  <div className="song-grid">
                    {filteredArtists.map((artist) => (
                      <article className="song-card" key={artist.name}>
                        <div className="cover-container">
                          <img src={artist.image} alt={artist.name} />
                          <button type="button" className="card-play" onClick={() => handleTrackPlay(popularTracks[0])}>
                            ▶
                          </button>
                        </div>
                        <h3>{artist.name}</h3>
                        <p>{artist.genre}</p>
                        <span>Artist</span>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {filteredTracks.length > 0 && (
                <>
                  <div className="section-header" style={{ marginTop: 30 }}>
                    <h2>Tracks</h2>
                  </div>
                  <div className="song-grid">
                    {filteredTracks.map((track) => (
                      <article className="song-card" key={track.title}>
                        <div className="cover-container">
                          <img src={track.image} alt={track.title} />
                          <button type="button" className="card-play" onClick={() => handleTrackPlay(track)}>
                            ▶
                          </button>
                        </div>
                        <h3>{track.title}</h3>
                        <p>{track.artist}</p>
                        <span>Track</span>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      );
    }

    if (activeNav === "Artists") {
      return (
        <>
          <h1 className="page-title">Artists</h1>
          <div className="song-grid">
            {featuredArtists.map((artist) => (
              <article className="song-card" key={artist.name}>
                <div className="cover-container">
                  <img src={artist.image} alt={artist.name} />
                  <button type="button" className="card-play" onClick={() => handleTrackPlay(popularTracks[0])}>
                    ▶
                  </button>
                </div>
                <h3>{artist.name}</h3>
                <p>{artist.genre}</p>
                <span>Featured artist</span>
              </article>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="library-header">
          <div className="library-icon">♫</div>
          <div>
            <p>PLAYLIST</p>
            <h2>Your Library</h2>
            <span>12 saved tracks • 3 playlists</span>
          </div>
        </div>

        <div className="library-list">
          {popularTracks.map((track, index) => (
            <div className="library-song" key={track.title}>
              <span className="song-number">{index + 1}</span>
              <img src={track.image} alt={track.title} />
              <div className="library-song-info">
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
              <span className="library-album">Ethiopian Mix</span>
              <button type="button" className="small-play" onClick={() => handleTrackPlay(track)}>
                ▶
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">♫ SoundWave</h2>

        <nav className="navigation">
          {Object.keys(navContent).map((navItem) => (
            <button
              key={navItem}
              className={`nav-item ${activeNav === navItem ? "active" : ""}`}
              onClick={() => setActiveNav(navItem)}
            >
              <span>{navItem === "Home" ? "⌂" : navItem === "Search" ? "⌕" : navItem === "Artists" ? "▤" : "♫"}</span>
              {navItem}
            </button>
          ))}
        </nav>

        <div className="playlist-section">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="section-title">{section.title.toUpperCase()}</p>
              {section.items.map((item) => (
                <button key={item} className="playlist-item" onClick={() => setActiveNav(section.title)}>
                  <span>{item.includes("Liked") || item.includes("Playlists") ? "♥" : "•"}</span>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="arrows">
            <button type="button">‹</button>
            <button type="button">›</button>
          </div>

          <div className="profile">
            <span>A</span>
            <p>Addis</p>
          </div>
        </header>

        <div className="page">{renderPageContent()}</div>
      </main>

      <div className="player">
        <div className="player-song">
          <img src={activeTrack.image} alt={activeTrack.title} />
          <div>
            <strong>{activeTrack.title}</strong>
            <span>{activeTrack.artist}</span>
          </div>
        </div>

        <div className="player-controls">
          <button type="button">⏮</button>
          <button type="button" className="play-button" onClick={togglePlayback}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button type="button">⏭</button>
        </div>

        <audio ref={audioRef} src={activeTrack.audio} preload="auto" />
      </div>
    </div>
  );
}

export default App;
