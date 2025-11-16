"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Music2,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  ChevronDown,
  ChevronUp,
  Search,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// داده‌های آهنگ‌ها
const songs = [
  {
    id: 1,
    title: "نترس",
    duration: "2:53",
    category: "عاشقانه",
    coverImage: "/Natars.jpg",
    audioUrl: "/audio/Natars.mp3",
    lyrics: `نترس عزیزم`,
  },
  {
    id: 2,
    title: "حصار",
    duration: "1:10",
    category: "آرام",
    coverImage: "/Hesar.jpg",
    audioUrl: "/audio/Hesar.mp3",
    lyrics: `حصار دور تو هست`,
  },
  {
    id: 3,
    title: "محکم",
    duration: "3:35",
    category: "غمگین",
    coverImage: "/Mohkam.jpg",
    audioUrl: "/audio/Mohkam.mp3",
    lyrics: `محکم..`,
  },
  {
    id: 4,
    title: "پوست شیر",
    duration: "2:32",
    category: "غمگین",
    coverImage: "/PoostShir.jpg",
    audioUrl: "/audio/PoostShir.mp3",
    lyrics: `پوست شیر`,
  },
  //   ,

  //   {
  //     id: 5,
  //     title: "آرامش",
  //     duration: "5:10",
  //     category: "آرام",
  //     coverImage: "/calm-peaceful-music-cover.jpg",
  //     audioUrl: "/audio/song5.mp3",
  //     lyrics: `در آغوش تو آرامش می‌یابم من
  // دنیای من با تو زیباست همیشه
  // لحظه‌های کنار تو طلایی است
  // عشق تو برای من همه چیز است`,
  //   },
  //   {
  //     id: 6,
  //     title: "انرژی",
  //     duration: "3:15",
  //     category: "شاد",
  //     coverImage: "/energetic-music-cover.jpg",
  //     audioUrl: "/audio/song6.mp3",
  //     lyrics: `با تو انرژی می‌گیرم هر روز
  // زندگی با تو پر از شور و شعف است
  // دستت را بگیر و با من بیا
  // بریم به سمت آینده‌ای روشن`,
  //   },
];

const categories = ["همه", "عاشقانه", "آرام", "غمگین", "شاد"];

export function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState<Record<number, number>>({});
  const [expandedLyrics, setExpandedLyrics] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlayerLyrics, setShowPlayerLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "همه" || song.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playNext = () => {
    const nextIndex = (currentSong + 1) % songs.length;
    setCurrentSong(nextIndex);
    setPlayCount((prev) => ({
      ...prev,
      [songs[nextIndex].id]: (prev[songs[nextIndex].id] || 0) + 1,
    }));
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const prevIndex = currentSong === 0 ? songs.length - 1 : currentSong - 1;
    setCurrentSong(prevIndex);
    setPlayCount((prev) => ({
      ...prev,
      [songs[prevIndex].id]: (prev[songs[prevIndex].id] || 0) + 1,
    }));
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const savedCounts = localStorage.getItem("playCount");
    if (savedCounts) {
      setPlayCount(JSON.parse(savedCounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playCount", JSON.stringify(playCount));
  }, [playCount]);

  const togglePlay = (songIndex: number) => {
    if (currentSong === songIndex && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentSong !== songIndex) {
        setCurrentSong(songIndex);
        setPlayCount((prev) => ({
          ...prev,
          [songs[songIndex].id]: (prev[songs[songIndex].id] || 0) + 1,
        }));
      }
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const toggleLyrics = (songId: number) => {
    setExpandedLyrics(expandedLyrics === songId ? null : songId);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Music2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  سلمان سلطان
                </h1>
                <p className="text-sm text-muted-foreground">
                  خواننده و آهنگساز
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Artist Image with Blur Effect */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl" />
              <img
                src="/singer-portrait-professional.jpg"
                alt="سلمان سلطان"
                className="relative w-full h-full rounded-full object-cover border-4 border-primary/30 shadow-2xl backdrop-blur-sm"
              />
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              سلمان سلطان
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              مجموعه‌ای از آهنگ‌های احساسی و پرانرژی برای لحظات خاص شما
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="جستجوی آهنگ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-12 text-lg bg-secondary/50 border-border/40 focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-base px-6"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Songs Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-foreground">
          {searchQuery || selectedCategory !== "همه"
            ? `نتایج (${filteredSongs.length})`
            : "تمام آهنگ‌ها"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song, index) => {
            const originalIndex = songs.findIndex((s) => s.id === song.id);
            return (
              <Card
                key={song.id}
                className="group relative overflow-hidden bg-card border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={song.coverImage || "/placeholder.svg"}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {currentSong === originalIndex && isPlaying && (
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium text-primary-foreground animate-pulse">
                      در حال پخش
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl"
                      onClick={() => togglePlay(originalIndex)}
                    >
                      {currentSong === originalIndex && isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 mr-1" />
                      )}
                    </Button>
                  </div>

                  {/* Play Count Badge */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    <span className="text-primary">
                      {playCount[song.id] || 0}
                    </span>
                    <span className="text-muted-foreground mr-1">پخش</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {song.title}
                      </h4>
                      <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {song.category}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {song.duration}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-4 text-primary hover:text-primary-foreground hover:bg-primary"
                    onClick={() => togglePlay(originalIndex)}
                  >
                    {currentSong === originalIndex && isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 ml-2" />
                        توقف
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 ml-2" />
                        پخش
                      </>
                    )}
                  </Button>

                  <div className="mt-4 border-t border-border/40 pt-4">
                    <button
                      onClick={() => toggleLyrics(song.id)}
                      className="flex items-center justify-between w-full text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>متن آهنگ</span>
                      {expandedLyrics === song.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {expandedLyrics === song.id && (
                      <div className="mt-4 text-base leading-8 text-foreground/80 whitespace-pre-line animate-in fade-in duration-300 p-4 bg-secondary/30 rounded-lg">
                        {song.lyrics}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-20">
            <Music2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              آهنگی یافت نشد
            </h3>
            <p className="text-muted-foreground">
              لطفاً فیلتر یا جستجوی خود را تغییر دهید
            </p>
          </div>
        )}
      </section>

      {/* Bottom Player */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/40 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {/* Album Art */}
              <img
                src={songs[currentSong].coverImage || "/placeholder.svg"}
                alt={songs[currentSong].title}
                className="w-16 h-16 rounded-lg object-cover"
              />

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {songs[currentSong].title}
                </h4>
                <p className="text-sm text-muted-foreground">سلمان سلطان</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playPrevious}
                  className="hover:bg-primary/10"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => togglePlay(currentSong)}
                  className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 mr-1" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playNext}
                  className="hover:bg-primary/10"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
                <span className="text-xs text-muted-foreground min-w-[40px]">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-2 bg-secondary rounded-full cursor-pointer group"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all group-hover:bg-primary/90 relative"
                    style={{
                      width: `${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground min-w-[40px]">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Lyrics Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlayerLyrics(!showPlayerLyrics)}
                className="hover:bg-primary/10"
              >
                {showPlayerLyrics ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronUp className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Mobile Progress Bar */}
            <div className="md:hidden mt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>{formatTime(currentTime)}</span>
                <span className="flex-1 text-center">
                  {songs[currentSong].title}
                </span>
                <span>{formatTime(duration)}</span>
              </div>
              <div
                className="w-full h-1 bg-secondary rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Lyrics Section in Player */}
            {showPlayerLyrics && (
              <div className="mt-4 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-bottom duration-300">
                <h5 className="text-sm font-semibold text-foreground mb-3">
                  متن آهنگ: {songs[currentSong].title}
                </h5>
                <div className="text-base leading-8 text-foreground/90 whitespace-pre-line p-4 bg-secondary/30 rounded-lg max-h-40 overflow-y-auto">
                  {songs[currentSong].lyrics}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8">
            {/* Social Media Links */}
            <div className="flex flex-col items-center gap-4">
              <h4 className="text-lg font-semibold text-foreground">
                مرا دنبال کنید
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Youtube className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Twitter className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
                <a
                  href="https://website.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Globe className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2025 سلمان سلطان - تمام حقوق محفوظ است</p>
            </div>
          </div>
        </div>
      </footer>

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          playNext();
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}
