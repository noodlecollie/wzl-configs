@ECHO OFF
yt-dlp --ignore-errors --format bestaudio --extract-audio --audio-format mp3 --audio-quality 320K --output "%%(title)s.%%(ext)s" "%1"
